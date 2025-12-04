"use client";

import React, { useState } from "react";
import DynamicTable from "@/components/ui/common/DynamicTable";
import { TableColumn, TableAction } from "@/types/table.types";
import { User } from "@/types/user.types";
import DynamicHeaderTabs from "@/components/DynamicHeaderTabs/DynamicHeaderTabs";
import { dataConstant } from "../constant";

export default function Reviews() {
  const [tab, setTab] = useState(1);

  const columns: TableColumn<User>[] = [
    { key: "reviewerName", label: "Reviewer Name" },
    { key: "reviewe", label: "Reviewer" },
    { key: "rating", label: "Rating" },
    { key: "toolName", label: "Tool Name" }
  ];

  const actions: TableAction<User>[] = [
    {
      label: "View Profile",
      onClick: (row) => alert(`👤 Viewing: ${row.reviewerName}`)
    },
    {
      label: "Edit",
      onClick: (row) => alert(`✏️ Editing: ${row.reviewerName}`)
    }
  ];

  const bulkActions = [
    {
      label: "Delete Selected",
      onClick: (rows: User[]) => alert(`Deleting ${rows.length} reviewers`)
    }
  ];

  const tabActions = [
    { label: "Manage Reviews" },
    { label: "Add Reviews" }
  ];

  return (
    <div className="tab-content-wrapper">
      <DynamicHeaderTabs
        actions={tabActions}
        activeIndex={tab - 1}
        onTabChange={(index) => setTab(index + 1)}
      />

      {tab === 1 ? (
        <DynamicTable
          columns={columns}
          data={dataConstant}
          actions={actions}
          bulkActions={bulkActions}
          searchKey="reviewerName"
          filterKeys={["reviewerRole"]}
          itemsPerPage={10}
        />
      ) : (
        <div>Add Reviewers</div>
      )}
    </div>
  );
}
