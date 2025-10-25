"use client";

import React, { useState } from "react";
import DynamicTable from "@/components/ui/common/DynamicTable";
import { TableColumn, TableAction } from "@/types/table.types";
import { User } from "@/types/user.types";
import DynamicHeaderTabs from "@/components/DynamicHeaderTabs/DynamicHeaderTabs";
import { dataConstant } from "../constant";
import AddCategory from "./components/addCategories";

export default function CategoryPage() {
  const [tab, setTab] = useState(1);

  const columns: TableColumn<User>[] = [
    { key: "category", label: "Category Name" },
    { key: "categoryDescription", label: "Category Description" },
    { key: "toolsCount", label: "Total Count" }
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
      label: "Manage Categories",
      onClick: () => setTab(1)
    },
    { label: "Add Categories", onClick: () => setTab(2) }
  ];

  return (
    <div className="tab-content-wrapper">
      <DynamicHeaderTabs actions={tabActions} defaultActive={0} />
      {tab === 1 ? (
        <DynamicTable
          columns={columns}
          data={dataConstant}
          actions={actions}    
          bulkActions={bulkActions}
          searchKey="category"
          //   filterKeys={["userType", "status"]}
          itemsPerPage={10}
        />
      ) : (
        <AddCategory />
      )}
    </div>
  );
}
