"use client";

import React, { useState } from "react";
import {
  FieldValues,
  Control,
  SubmitHandler,
  Controller
} from "react-hook-form";
import { DynamicFormProps, FormField } from "@/types/form.types";
// import DropzoneComponent from "./DropzoneComponent";
// import AsyncDropdown from "./AsyncDropdown";
const DropzoneComponent = dynamic(() => import("./DropzoneComponent"), { ssr: false });
const AsyncDropdown = dynamic(() => import("./AsyncDropdown"), { ssr: false });
import Input from "./Input";
import Button from "./Button";
import styles from "./style/DynamicForm.module.scss";
import dynamic from "next/dynamic";

function DynamicFormInner<T extends FieldValues>({
  fields,
  control,
  handleSubmit,
  onSubmit,
  isLoading = false,
  buttonText = "Submit"
}: Omit<DynamicFormProps<T>, "register" | "formState"> & {
  control: Control<T>;
}) {
  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>(
    {}
  );

  const handleImageChange = (name: string, files: FileList | null) => {
    if (files && files[0]) {
      setImagePreviews((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(files[0])
      }));
    }
  };

  const groupedFields: Record<string | number, FormField<T>[]> = {};
  fields.forEach((f) => {
    const key = f.row ?? `row-${Math.random()}`;
    if (!groupedFields[key]) groupedFields[key] = [];
    groupedFields[key].push(f);
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles["form-container"]}
    >
      {Object.values(groupedFields).map((rowFields, rowIdx) => (
        <div key={rowIdx} className={styles["form-row"]}>
          {rowFields.map((field, idx) => {
            switch (field.type) {
              case "input":
              case "password":
                return (
                  <Input
                    key={field.name || idx}
                    name={field.name!}
                    label={field.label}
                    type={field.type === "password" ? "password" : "text"}
                    placeholder={field.placeholder}
                    control={control}
                    style={field.style}
                    wrapperStyle={field.wrapperStyle}
                    icon={field.icon}
                  />
                );

              case "dropdown":
                return field.fetchOptions ? (
                  <AsyncDropdown
                    key={field.name || idx}
                    field={field}
                    value={field.value}
                    onChange={field.onChange}
                    error={
                      field.name
                        ? field.value
                          ? undefined
                          : "Required"
                        : undefined
                    }
                  />
                ) : (
                  <div key={field.name || idx}>
                    <Controller
                      name={field.name!}
                      control={control}
                      render={({ field: controllerField, fieldState }) => (
                        <>
                          <select
                            {...controllerField}
                            className={styles["select"]}
                            style={field.style}
                          >
                            <option value="">Select {field.label}</option>
                            {field.options?.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          {fieldState.error && (
                            <p className={styles["error"]}>
                              {fieldState.error.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                );

              case "image":
                return (
                  <div
                    key={field.name || idx}
                    className={styles["image-field"]}
                  >
                    {field.label && <label>{field.label}</label>}
                    <DropzoneComponent
                      onDrop={(files) => handleImageChange(field.name!, files)}
                      error=""
                    />
                    {imagePreviews[field.name!] && (
                      <img
                        src={imagePreviews[field.name!]}
                        alt="preview"
                        className={styles["image-preview"]}
                      />
                    )}
                  </div>
                );

              case "button":
                return (
                  <Button
                    key={idx}
                    label={field.label || buttonText}
                    loading={isLoading}
                    style={field.style}
                    wrapperStyle={field.wrapperStyle}
                  />
                );

              default:
                return null;
            }
          })}
        </div>
      ))}
    </form>
  );
}

const DynamicForm = React.memo(DynamicFormInner) as typeof DynamicFormInner;
export default DynamicForm;
