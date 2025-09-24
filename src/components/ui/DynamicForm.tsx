import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { DynamicFormProps, FormField } from "@/types/form.types";
import DropzoneComponent from "./DropzoneComponent";
import AsyncDropdown from "./AsyncDropdown";
import styles from "./style/DynamicForm.module.scss";

function DynamicFormInner<T extends FieldValues>({
  fields,
  register,
  handleSubmit,
  formState,
  onSubmit,
  buttonText = "Submit",
  isLoading = false,
}: DynamicFormProps<T>) {
  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  const handleImageChange = (name: string, files: FileList | null) => {
    if (files && files[0]) {
      setImagePreviews(prev => ({ ...prev, [name]: URL.createObjectURL(files[0]) }));
    }
  };

  // Group fields by row
  const groupedFields: Record<string | number, FormField<T>[]> = {};
  fields.forEach(f => {
    const key = f.row ?? `row-${Math.random()}`;
    if (!groupedFields[key]) groupedFields[key] = [];
    groupedFields[key].push(f);
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["form-container"]}>
      {Object.values(groupedFields).map((rowFields, rowIdx) => (
        <div key={rowIdx} className={styles["form-row"]}>
          {rowFields.map((field, idx) => {
            const errorMsg = field.name ? (formState.errors[field.name]?.message as string | undefined) : undefined;

            const inputClass = `${styles["form-input"]} ${errorMsg ? styles.error : ""}`;
            const wrapperClass = styles["form-group"];

            switch (field.type) {
              case "input":
              case "password":
                return (
                  <div key={field.name || idx} className={wrapperClass} style={field.wrapperStyle}>
                    {field.label && <label className={styles["form-label"]}>{field.label}</label>}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type={field.type === "password" && showPassword[field.name!] ? "text" : field.type}
                        placeholder={field.placeholder}
                        {...register(field.name!)}
                        className={inputClass}
                        style={field.style} // dynamic override
                      />
                      {field.type === "password" && (
                        <button
                          type="button"
                          onClick={() => setShowPassword(prev => ({ ...prev, [field.name!]: !prev[field.name!] }))}
                          className={styles["password-toggle"]}
                        >
                          {showPassword[field.name!] ? "Hide" : "Show"}
                        </button>
                      )}
                    </div>
                    {errorMsg && <p className={styles["form-error"]}>{errorMsg}</p>}
                  </div>
                );

              case "dropdown":
                return (
                  <div key={field.name || idx} className={wrapperClass} style={field.wrapperStyle}>
                    {field.label && <label className={styles["form-label"]}>{field.label}</label>}
                    {field.fetchOptions ? (
                      <AsyncDropdown field={field} value={field.value} onChange={field.onChange} error={errorMsg} />
                    ) : (
                      <select {...register(field.name!)} className={inputClass} style={field.style}>
                        <option value="">Select {field.label}</option>
                        {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    )}
                    {errorMsg && <p className={styles["form-error"]}>{errorMsg}</p>}
                  </div>
                );

              case "image":
                return (
                  <div key={field.name || idx} className={wrapperClass} style={field.wrapperStyle}>
                    {field.label && <label className={styles["form-label"]}>{field.label}</label>}
                    <DropzoneComponent onDrop={files => handleImageChange(field.name!, files)} error={errorMsg} />
                    {imagePreviews[field.name!] && (
                      <img src={imagePreviews[field.name!]} alt="preview" className={styles["image-preview"]} />
                    )}
                    {errorMsg && <p className={styles["form-error"]}>{errorMsg}</p>}
                  </div>
                );

              case "button":
                return (
                  <button
                    key={idx}
                    type="submit"
                    disabled={isLoading}
                    className={styles["form-button"]}
                    style={field.style || field.wrapperStyle} // dynamic override if passed
                  >
                    {isLoading ? "Loading..." : field.label || buttonText}
                  </button>
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
