import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { DynamicFormProps, FormField } from "@/types/form.types";
import DropzoneComponent from "./DropzoneComponent";
import AsyncDropdown from "./AsyncDropdown";

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ 
      background: 'white', 
      padding: '1.5rem', 
      borderRadius: '8px', 
      width: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1rem' 
    }}>
      {fields.map((field, idx) => {
        const errorMsg = "name" in field ? (formState.errors[field.name]?.message as string | undefined) : undefined;

        switch (field.type) {
          case "input":
          case "password":
            return (
              <div key={field.name} className="form-group">
                {field.label && <label className="form-group label">{field.label}</label>}
                <div className={field.type === "password" ? "password-input" : ""}>
                  <input
                    type={field.type === "password" && showPassword[field.name] ? "text" : field.type}
                    placeholder={field.placeholder}
                    {...register(field.name)}
                    className={`form-control ${errorMsg ? "error" : ""}`}
                    style={errorMsg ? { borderColor: '#d32f2f' } : {}}
                  />
                  {field.type === "password" && (
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(prev => ({ ...prev, [field.name]: !prev[field.name] }))
                      }
                      className="password-toggle"
                    >
                      {showPassword[field.name] ? "Hide" : "Show"}
                    </button>
                  )}
                </div>
                {errorMsg && <p className="error">{errorMsg}</p>}
              </div>
            );

          case "dropdown":
            return (
              <div key={field.name} className="form-group">
                {field.label && <label className="form-group label">{field.label}</label>}
                {field.fetchOptions ? (
                  <AsyncDropdown field={field} value={field.value} onChange={field.onChange} error={errorMsg} />
                ) : (
                  <select
                    {...register(field.name)}
                    className="form-control"
                    style={errorMsg ? { borderColor: '#d32f2f' } : {}}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}
                {errorMsg && <p className="error">{errorMsg}</p>}
              </div>
            );

          case "image":
            return (
              <div key={field.name} className="form-group">
                {field.label && <label className="form-group label">{field.label}</label>}
                <DropzoneComponent onDrop={files => handleImageChange(field.name, files)} error={errorMsg} />
                {imagePreviews[field.name] && (
                  <img src={imagePreviews[field.name]} alt="preview" style={{ marginTop: '0.5rem', width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                )}
              </div>
            );

          case "button":
            return (
              <button
                key={idx}
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
              >
                {isLoading ? "Loading..." : field.label || buttonText}
              </button>
            );

          default:
            return null;
        }
      })}
    </form>
  );
}

const DynamicForm = React.memo(DynamicFormInner) as typeof DynamicFormInner;
export default DynamicForm;