"use client";

import React, { useState } from "react";
import {
  FieldValues,
  Control,
  SubmitHandler,
  Controller,
  useWatch
} from "react-hook-form";
import { DynamicFormProps, FormField } from "@/types/form.types";
import dynamic from "next/dynamic";
import Input from "./Input";
import TextAreaInput from "./TextAreaInput";
import Button from "./Button";
import styles from "./style/DynamicForm.module.scss";

const DropzoneComponent = dynamic(() => import("./DropzoneComponent"), {
  ssr: false
});
const AsyncDropdown = dynamic(() => import("./AsyncDropdown"), { ssr: false });

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

  const watchedValues = useWatch({ control });

  const handleImageChange = (name: string, files: FileList | null) => {
    if (files && files[0]) {
      setImagePreviews((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(files[0])
      }));
    }
  };

  // Group fields by row
  const groupedFields: Record<string | number, FormField<T>[]> = {};
  fields.forEach((f) => {
    const key = f.row ?? `row-${Math.random()}`;
    if (!groupedFields[key]) groupedFields[key] = [];
    groupedFields[key].push(f);
  });

  // Check if this row contains only image fields

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles["form-container"]}
    >
      {Object.values(groupedFields).map((rowFields, rowIdx) => {
        // Calculate total columns for this row
        const totalCols = rowFields.reduce((acc, f) => acc + (f.col || 1), 0);
        const isImageRow = rowFields.every((f) => f.type === "image");

        return (
          <div
            key={rowIdx}
            className={isImageRow ? styles["image-row"] : styles["form-row"]}
            style={
              isImageRow
                ? {} // grid styling handled in CSS
                : {
                    display: "grid",
                    gridTemplateColumns: `repeat(${totalCols}, 1fr)`,
                    gap: "16px",
                    alignItems: "start",
                    marginBottom:
                      rowIdx === Object.values(groupedFields).length - 1
                        ? "0"
                        : "3px"
                  }
            }
          >
            {rowFields.map((field, idx) => {
              const colSpan = field.col || 1;
              const fieldWrapperStyle = {
                gridColumn: `span ${colSpan}`,
                ...field.wrapperStyle
              };

              // Conditional logic
              if (field.conditional) {
                const dependentValue =
                  watchedValues[field.conditional?.field] ??
                  fields.find((f) => f.name === field.conditional?.field)
                    ?.value;

                if (dependentValue !== field.conditional.value) return null;
              }

              // Field types
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
                      wrapperStyle={fieldWrapperStyle}
                      icon={field.icon}
                    />
                  );

                case "textarea":
                  return (
                    <TextAreaInput
                      key={field.name || idx}
                      name={field.name!}
                      label={field.label}
                      placeholder={field.placeholder}
                      control={control}
                      style={field.style}
                      wrapperStyle={fieldWrapperStyle}
                    />
                  );

                case "dropdown":
                  return (
                    <Controller
                      key={field.name || idx}
                      name={field.name!}
                      control={control}
                      defaultValue={field.multiple ? [] : ""}
                      render={({ field: controllerField, fieldState }) => (
                        <AsyncDropdown
                          field={
                            field as import("@/types/form.types").DropdownField<FieldValues>
                          }
                          value={controllerField.value}
                          onChange={controllerField.onChange}
                          error={fieldState.error?.message}
                          wrapperStyle={fieldWrapperStyle}
                        />
                      )}
                    />
                  );

                case "image":
                  return (
                    <Controller
                      key={field.name || idx}
                      name={field.name!}
                      control={control}
                      render={({ field: controllerField }) => (
                        <div style={fieldWrapperStyle}>
                          {field.label && (
                            <label className={styles.imageLabel}>
                              {field.label}
                            </label>
                          )}
                          <div className={styles.uploadCard}>
                            {imagePreviews[field.name!] ? (
                              <>
                                <img
                                  src={imagePreviews[field.name!]}
                                  alt="preview"
                                  className={styles.imagePreviewCard}
                                />
                                <button
                                  type="button"
                                  className={styles.uploadIcon}
                                  onClick={() => {
                                    setImagePreviews((prev) => ({
                                      ...prev,
                                      [field.name!]: ""
                                    }));
                                    controllerField.onChange(null);
                                  }}
                                >
                                  ✖
                                </button>
                              </>
                            ) : (
                              <label className={styles.uploadPlaceholder}>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      controllerField.onChange(file);
                                      setImagePreviews((prev) => ({
                                        ...prev,
                                        [field.name!]: URL.createObjectURL(file)
                                      }));
                                    }
                                  }}
                                  style={{ display: "none" }}
                                />
                                <div className={styles.uploadInner}>
                                  <span className={styles.plusIcon}>＋</span>
                                  <p>Upload Image</p>
                                </div>
                              </label>
                            )}
                          </div>
                        </div>
                      )}
                    />
                  );

                case "button":
                  return (
                    <Button
                      key={idx}
                      label={field.label || buttonText}
                      loading={isLoading}
                      style={{ ...field.style, ...fieldWrapperStyle }}
                    />
                  );

                default:
                  return null;
              }
            })}
          </div>
        );
      })}
    </form>
  );
}

const DynamicForm = React.memo(DynamicFormInner) as typeof DynamicFormInner;
export default DynamicForm;
