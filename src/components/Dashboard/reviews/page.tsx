"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import DynamicHeaderTabs from "@/components/DynamicHeaderTabs/DynamicHeaderTabs";
import DynamicTable from "@/components/ui/common/DynamicTable";
import DynamicForm from "@/components/ui/DynamicForm";

import { TableColumn, TableAction } from "@/types/table.types";
import { reviewFields } from "@/lib/review/fields/formFields";
import { reviewSchema, ReviewInput } from "@/lib/validators/reviewValidator";

import {
  useGetAllReviewsQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
} from "@/features/review/reviewApi";

import { useGetAllToolsQuery } from "@/features/tools/toolsApi";

import styles from "../../ui/style/Reviews.module.scss";
import { getUserId, getUserType } from "@/utils/authStorage";

export default function Reviews() {
  const userType = getUserType();
  const userId = getUserId();

  const { data, isLoading, refetch } = useGetAllReviewsQuery();
  const { data: allToolsData } = useGetAllToolsQuery();

  const reviews = data?.result?.list || [];
  const tools = allToolsData?.result?.list || [];

 
  const toolOptions = tools.map((t: any) => ({
    label: t.toolName,
    value: t._id,
  }));

  const [addReview] = useAddReviewMutation();
  const [updateReview] = useUpdateReviewMutation();

  const [tab, setTab] = useState<1 | 2>(1);
  const [editReview, setEditReview] = useState<any | null>(null);
  const isEditMode = Boolean(editReview);


  const {
  control,
  handleSubmit,
  reset,
  formState: { isSubmitting },
} = useForm<ReviewInput & { _id?: string }>({
  resolver: zodResolver(reviewSchema),
  mode: "onBlur",
});



  useEffect(() => {
    if (editReview) {
      reset({
        rating: editReview.rating,
        reviewText: editReview.reviewText || "",
        toolId: editReview.toolId?._id,
        status: editReview.status || "Pending",
      });
      setTab(2);
    }
  }, [editReview, reset]);


  const columns: TableColumn<any>[] = [
    {
      key: "reviewerName",
      label: "Reviewer Name",
      render: (row) =>
        row?.userId
          ? `${row.userId.firstName} ${row.userId.lastName}`
          : "N/A",
    },
    { key: "reviewText", label: "Review Text" },
    { key: "rating", label: "Rating" },
    { key: "toolId.toolName", label: "Tool Name" },
    { key: "status", label: "Status" },
  ];

  const actions: TableAction<any>[] = [
    {
      label: "Edit",
      onClick: (row) => setEditReview(row),
    },
  ];

  /** Tab Buttons */
  const tabActions = [
    {
      label: "Manage Reviews",
      onClick: () => {
              reset({});
        setEditReview(null);
        setTab(1);
      },
    },
    {
      label: isEditMode ? "Update Review" : "Add Review",
      onClick: () =>{
              reset({});
         setTab(2);
      },
    },
  ];

  /** Submit Handler */
  const onSubmit = async (data: any) => {
    try {
      if (isEditMode) {
        /** UPDATE Review Correct Payload */
        await updateReview({
          reviewId: editReview._id??"",
          userId: userId??"",
          ...data
        }).unwrap();
      } else {
        /** ADD Review */
        await addReview({
          toolId: data.toolId,
          userId: userId??"",
          ...data
        }).unwrap();
      }

      reset({});
      setEditReview(null);
      setTab(1);
      refetch();
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className={styles.reviewsWrapper}>
      <DynamicHeaderTabs
        actions={tabActions}
        activeIndex={tab - 1}
        onTabChange={(index) => {
          const t = (index + 1) as 1 | 2;
          setTab(t);
          if (t === 1) {
            reset();
            setEditReview(null);
          }
        }}
      />

      {tab === 1 ? (
        isLoading ? (
          <p className={styles.loadingText}>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className={styles.noDataText}>No Reviews Found</p>
        ) : (
          <DynamicTable
            columns={columns}
            data={reviews}
            actions={actions}
            searchKey="reviewerName"
            filterKeys={["status"]}
            itemsPerPage={10}
          />
        )
      ) : (
        <div className={styles.formContainer}>
          <DynamicForm
            fields={reviewFields(userType === "Admin", toolOptions, isEditMode) as any}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isLoading={isSubmitting}
            buttonText={isEditMode ? "Update Review" : "Add Review"}
          />
        </div>
      )}
    </div>
  );
}
