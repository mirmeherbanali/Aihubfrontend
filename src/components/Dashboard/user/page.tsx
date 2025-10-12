"use client";

import React, { useMemo } from "react";
import DynamicTable from "@/components/ui/common/DynamicTable";
import { TableColumn, TableAction } from "@/types/table.types";
import { useGetAllUsersQuery } from "@/features/auth/authApi";
import { User } from "@/types/user.types";

export default function UserPage() {
  const { data, isLoading, isError } = useGetAllUsersQuery();

  // 🧠 Extract and normalize data from different backend shapes
  const users: User[] = useMemo(() => {
    if (!data) return [];
    const raw =
      Array.isArray(data)
        ? data
        : data?.list && Array.isArray(data.list)
        ? data.list
        : data?.result?.list && Array.isArray(data.result.list)
        ? data.result.list
        : [];
    return raw as User[];
  }, [data]);

  // 🧱 Columns
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
        new Date(row.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
  ];

  // ⚙️ Actions per row
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

  // 🧾 Bulk Actions
  const bulkActions = [
    {
      label: "Delete Selected",
      onClick: (rows: User[]) => alert(`Deleting ${rows.length} users`),
    },
  ];

  // 🌟 Loading and Error States
  if (isLoading)
    return (
      <div className="p-6 text-center text-gray-600">
        <p>Loading users...</p>
      </div>
    );

  if (isError)
    return (
      <div className="p-6 text-center text-red-600">
        <p>Failed to load users.</p>
      </div>
    );

  // 🌟 Render Table
  return (
    <div className="p-6">

      <DynamicTable
        columns={columns}
        data={users}
        actions={actions}
        bulkActions={bulkActions}
        searchKey="firstName"
        filterKeys={["userType", "status"]} 
        itemsPerPage={10}
      />
    </div>
  );
}
