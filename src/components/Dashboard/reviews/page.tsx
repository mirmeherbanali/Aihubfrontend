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

  /** 🔥 Convert tools → dropdown format */
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
    setValue,
    formState: { isSubmitting },
  } = useForm<ReviewInput & { toolId?: string }>({
    resolver: zodResolver(reviewSchema),
    mode: "onBlur",
  });

  /** 🔥 Prefill form on edit */
  useEffect(() => {
    if (editReview) {
      reset({
        rating: editReview.rating,
        reviewText: editReview.reviewText || "",
        toolId: editReview.toolId, // preload dropdown
      });
      setTab(2);
    }
  }, [editReview, reset]);

  /** TABLE CONFIG */
  const columns: TableColumn<any>[] = [
    { key: "reviewerName", label: "Reviewer Name" },
    { key: "reviewerRole", label: "Reviewer Role" },
    { key: "rating", label: "Rating" },
    { key: "toolId.toolName", label: "Tool Name" },
  ];

  const actions: TableAction<any>[] = [
    {
      label: "Edit",
      onClick: (row) => setEditReview(row),
    },
  ];

  const tabActions = [
    {
      label: "Manage Reviews",
      onClick: () => {
        setEditReview(null);
        reset();
        setTab(1);
      },
    },
    {
      label: isEditMode ? "Update Review" : "Add Review",
      onClick: () => setTab(2),
    },
  ];

  /** 🔥 SUBMIT = CREATE + UPDATE */
  const onSubmit = async (data: any) => {
    try {
      if (isEditMode) {
        await updateReview({
          toolId: editReview.toolId,
          userId: editReview.userId?._id ?? "",
          ...data,
        }).unwrap();
      } else {
        await addReview({
          toolId: data.toolId, // selected dropdown value
          userId: userId, // logged-in user
          ...data,
        }).unwrap();
      }

      reset();
      setEditReview(null);
      setTab(1);
      refetch();
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };
console.log("reviews",reviews)
  return (
    <div className={styles.reviewsWrapper}>
      <DynamicHeaderTabs
        actions={tabActions}
        activeIndex={tab - 1}
        onTabChange={(index) => {
          const t = (index + 1) as 1 | 2;
          setTab(t);
          if (t === 1) {
            setEditReview(null);
            reset();
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
            filterKeys={["reviewerRole"]}
            itemsPerPage={10}
          />
        )
      ) : (
        <div className={styles.formContainer}>
          <DynamicForm
            fields={reviewFields(userType === "Admin", toolOptions)}
            control={control as any}
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
