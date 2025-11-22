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
    { key: "reviewerId", label: "Reviewer ID" },
    { key: "reviewerName", label: "Reviewer Name" },
    { key: "reviewerEmail", label: "Reviewer Email" },
    { key: "reviewerRole", label: "Reviewer Role" },
    { key: "toolId", label: "Tool ID" },
    { key: "toolName", label: "Tool Name" }
  ];

  const actions: TableAction<User>[] = [
    {
      label: "View Profile",
      onClick: (row) => alert(`👤 Viewing: ${row.firstName} ${row.lastName}`)
    },
    {
      label: "Edit",
      onClick: (row) => alert(`✏️ Editing: ${row.firstName} ${row.lastName}`)
    }
  ];

  const bulkActions = [
    {
      label: "Delete Selected",
      onClick: (rows: User[]) => alert(`Deleting ${rows.length} users`)
    }
  ];

  const tabActions = [
    {
      label: "Manage Reviews",
      onClick: () => setTab(1)
    },
    { label: "Add Reviews", onClick: () => setTab(2) }
  ];

  return (
    <div className="tab-content-wrapper">
      <DynamicHeaderTabs actions={tabActions} defaultActive={0} />
      {tab === 1 ? (

        <div>Add Reviewers</div>

        // <DynamicTable
        //   columns={columns}
        //   data={dataConstant}
        //   actions={actions}
        //   bulkActions={bulkActions}
        //   searchKey="reviewerName"
        //   filterKeys={["reviewerRole"]}
        //   itemsPerPage={10}
        // />
      ) : (
        // <AddCategory />
        <div>Add Reviewers</div>
      )}
    </div>
  );
}
