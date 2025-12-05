"use client";

import React, { useState } from "react";
import DynamicTable from "@/components/ui/common/DynamicTable";
import { TableColumn, TableAction } from "@/types/table.types";
import { User } from "@/types/user.types";
import DynamicHeaderTabs from "@/components/DynamicHeaderTabs/DynamicHeaderTabs";
import AddUser from "./components/addUser";

import {
  useGetAllUsersQuery,
  useDeleteProfileMutation,
} from "@/features/auth/authApi";
import { getUserId } from "@/utils/authStorage";
import ViewUserModal from "./components/ViewUserModal";

export default function UserPage() {
  const { data, isLoading,refetch } = useGetAllUsersQuery();
  const [deleteProfile] = useDeleteProfileMutation();
  const userId =getUserId()??""
  const [tab, setTab] = useState(1);

  // 🟦 For editing
  const [editData, setEditData] = useState<User | null>(null);
  const [viewUser, setViewUser] = useState<User | null>(null);


  const allUsers =
  data?.result?.list
    ?.filter((u: User) => u.status !== "Deleted") // remove deleted users
    ?.sort(
      (a: User, b: User) =>
        ((b.createdAt ? new Date(b.createdAt).getTime() : 0) -
         (a.createdAt ? new Date(a.createdAt).getTime() : 0))
    ) || [];

  const safeValue = (value: any) => {
  return value === undefined || value === null || value === "" ? "N/A" : value;
};

  const columns: TableColumn<User>[] = [
  { key: "firstName", label: "First Name", render: (r) => safeValue(r.firstName) },
  { key: "lastName", label: "Last Name", render: (r) => safeValue(r.lastName) },
  { key: "userType", label: "User Type", render: (r) => safeValue(r.userType) },
  { key: "companyName", label: "Company", render: (r) => safeValue(r.companyName) },
  { key: "companyEmail", label: "Email", render: (r) => safeValue(r.companyEmail) },
  { key: "country", label: "Country", render: (r) => safeValue(r.country) },
  { key: "status", label: "Status", render: (r) => safeValue(r.status) },

  {
    key: "createdAt",
    label: "Created",
    render: (row) =>
      row.createdAt
        ? new Date(row.createdAt).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })
        : "N/A",
  },
];


  // ⚡ Actions: Edit + Delete + View
  const actions: TableAction<User>[] = [
    {
      label: "View",
      onClick: (row) => setViewUser(row),
    },
    {
      label: "Edit",
      onClick: (row) => {
        setEditData(row); // pass selected user
        setTab(2); // go to form
      },
    },
    {
      label: "Delete",
      onClick: async (row) => {
        console.log("row",row)
        if (confirm(`Delete ${row.firstName}?`)) {
          await deleteProfile({ userId: String(row._id), adminId: userId });
          alert("User deleted");
          refetch();
        }
      },
    },
  ];

  // ⚡ Bulk delete
  const bulkActions = [
    {
      label: "Delete Selected",
      onClick: async (rows: User[]) => {
        if (!rows.length) return;
        if (!confirm(`Delete ${rows.length} users?`)) return;

        for (const user of rows) {
          await deleteProfile({ userId: String(user._id), adminId:userId });
        }

        alert("Selected users deleted");
        refetch();
      },
    },
  ];

  const tabActions = [
    { label: "Manage Users", onClick: () => { setTab(1); setEditData(null); }},
    { label: editData ? "Edit User" : "Add User", onClick: () => setTab(2) },
  ];

  return (
    <div className="tab-content-wrapper">
      <DynamicHeaderTabs actions={tabActions} defaultActive={0} />

      {tab === 1 ? (
        isLoading ? (
          <p>Loading users...</p>
        ) : (
          <>
          <DynamicTable
            columns={columns}
            data={allUsers}
            actions={actions}
            bulkActions={bulkActions}
            searchKey="firstName"
            filterKeys={["userType", "status"]}
            itemsPerPage={10}
          />
{viewUser && <ViewUserModal user={viewUser} onClose={() => setViewUser(null)} />}
</>
        )
      ) : (
        <AddUser editData={editData} setEditData={setEditData} setTab={setTab} refetch={refetch} />
      )}
    </div>
  );
}
