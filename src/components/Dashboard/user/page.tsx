"use client";

import React, { useState } from "react";
import DynamicTable from "@/components/ui/common/DynamicTable";
import { TableColumn, TableAction } from "@/types/table.types";
import { User } from "@/types/user.types";
import DynamicHeaderTabs from "@/components/DynamicHeaderTabs/DynamicHeaderTabs";
import AddUser from "./components/addUser";
import { useGetAllUsersQuery } from "@/features/auth/authApi";

export default function UserPage() {
  const { data, isLoading } = useGetAllUsersQuery();
  const [tab, setTab] = useState(1);

  // ✅ All users
  const allUsers = data || [];


  // ✅ Default filter: only show Reviewer type users
  // const filteredUsers = allUsers.filter(
  //   (user: User) => user.userType?.toLowerCase() === "reviewer"
  // );

  const columns: TableColumn<User>[] = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "userType", label: "User Type" },
    { key: "companyName", label: "Company" },
    { key: "companyEmail", label: "Email" },
    { key: "country", label: "Country" },
    { key: "status", label: "Status" },
    { key: "role", label: "Role" },
    {
      key: "createdAt",
      label: "Created",
      render: (row) =>
  row.createdAt
    ? new Date(row.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—",

    },
  ];

  const actions: TableAction<User>[] = [
    {
      label: "View Profile",
      onClick: (row) => alert(`👤 Viewing: ${row.firstName} ${row.lastName}`),
    },
    {
      label: "Edit",
      onClick: (row) => alert(`✏️ Editing: ${row.firstName} ${row.lastName}`),
    },
  ];

  const bulkActions = [
    {
      label: "Delete Selected",
      onClick: (rows: User[]) => alert(`Deleting ${rows.length} users`),
    },
  ];

  const tabActions = [
    {
      label: "Manage Users",
      onClick: () => setTab(1),
    },
    { label: "Add Users", onClick: () => setTab(2) },
  ];

  return (
    <div className="tab-content-wrapper">
      <DynamicHeaderTabs actions={tabActions} defaultActive={0} />
      {tab === 1 ? (
        isLoading ? (
          <p>Loading users...</p>
        ) : (
          <DynamicTable
            columns={columns}
            data={allUsers} // ✅ default Reviewer only
            actions={actions}
            bulkActions={bulkActions}
            searchKey="firstName"
            filterKeys={["userType", "status"]}
            itemsPerPage={10}
          />
        )
      ) : (
        <AddUser />
      )}
    </div>
  );
}
