import DynamicHeaderTabs from "@/components/DynamicHeaderTabs/DynamicHeaderTabs";
import DynamicTable from "@/components/ui/common/DynamicTable";
import DynamicForm from "@/components/ui/DynamicForm";
import { toolsFields } from "@/lib/dashboard/tools/fields/formFields";
import { ToolsInput, toolsSchema } from "@/lib/validators/toolsValidator";
import { TableAction, TableColumn } from "@/types/table.types";
import { User } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toolsData } from "./constant/constant";

const AdminTools = () => {
  const [tab, setTab] = useState(1);

  const tabActions = [
    {
      label: "Manage Tools",
      onClick: () => setTab(1)
    },
    { label: "Add Tools", onClick: () => setTab(2) }
  ];

  // Form for adding a new tool
  const addForm = useForm<ToolsInput>({
    resolver: zodResolver(toolsSchema),
    mode: "onBlur",
    defaultValues: {}
  });

  const handleAddSubmit = (data: ToolsInput) => {
    addForm.reset();
  };

  const columns: TableColumn<User>[] = [
    { key: "_id", label: "Id" },
    { key: "toolname", label: "Tool Name" },
    { key: "category", label: "Category" },
    { key: "status", label: "Status" },
    { key: "submiteddate", label: "Submitted Date" }
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

  return (
    <div className="tab-content-wrapper">
      <DynamicHeaderTabs actions={tabActions} defaultActive={0} />
      {tab === 1 ? (
        <DynamicTable
          columns={columns}
          data={toolsData}
          actions={actions}
          bulkActions={bulkActions}
          searchKey="toolname"
          filterKeys={["status"]}
          itemsPerPage={10}
        />
      ) : (
        //   <AddUser />
        <div
          style={{
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid blue",
            margin: "50px 0px"
          }}
        >
          <DynamicForm
            fields={toolsFields}
            control={addForm.control}
            handleSubmit={addForm.handleSubmit}
            onSubmit={handleAddSubmit}
            buttonText="Add Tool"
          />
        </div>
      )}
    </div>
  );
};

export default AdminTools;
