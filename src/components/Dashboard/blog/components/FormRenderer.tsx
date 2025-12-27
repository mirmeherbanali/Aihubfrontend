import {
  FieldValues,
  Control,
  Controller,
  SubmitHandler,
  UseFormHandleSubmit,
  FieldErrors,
} from "react-hook-form";
import Select from "react-select";
import ImagePicker from "./ImagePicker";
import RichEditor from "./RichEditor";
import styles from "../../../ui/style/BlogEditor.module.scss";
import { useState } from "react";
import Modal from "./Modal";

type Props<T extends FieldValues> = {
  config: any[];
  control: Control<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  onSubmit: SubmitHandler<T>;
  errors: FieldErrors<T>;
  onActionClick?: (action: "Draft" | "Published") => void;
  loading?: boolean;
};

export default function FormRenderer<T extends FieldValues>({
  config,
  control,
  handleSubmit,
  onSubmit,
  errors,
  onActionClick,
  loading,
}: Props<T>) {
  const [activeModalField, setActiveModalField] = useState<any>(null);

  const renderError = (name: string, index?: number) => {
    const fieldErr: any = (errors as any)?.[name];
    if (index !== undefined) {
      return fieldErr?.[index]?.message as string | undefined;
    }
    return fieldErr?.message as string | undefined;
  };

  const renderField = (field: any, index?: number) => {
    /* ================= TEXT ================= */
    if (field.type === "text") {
      return (
        <>
          <Controller
            name={field.name}
            control={control}
            render={({ field: f }) => (
              <input {...f} placeholder={field.placeholder} />
            )}
          />
          {renderError(field.name) && (
            <p className={styles.error}>{renderError(field.name)}</p>
          )}
        </>
      );
    }

    /* ================= TEXTAREA ================= */
    if (field.type === "textarea") {
      return (
        <>
          <Controller
            name={field.name}
            control={control}
            render={({ field: f }) => (
              <textarea {...f} placeholder={field.placeholder} />
            )}
          />
          {renderError(field.name) && (
            <p className={styles.error}>{renderError(field.name)}</p>
          )}
        </>
      );
    }

    /* ================= SELECT ================= */
    if (field.type === "select") {
      return (
        <>
          <Controller
            name={field.name}
            control={control}
            render={({ field: rhf }) => (
              <Select
                isMulti={field.isMulti}
                options={field.options}
                value={
                  field.isMulti
                    ? field.options?.filter((opt: any) =>
                        rhf.value?.includes(opt.value)
                      )
                    : field.options?.find((opt: any) => opt.value === rhf.value)
                }
                onChange={(selected: any) => {
                  if (field.isMulti) {
                    rhf.onChange(selected.map((s: any) => s.value));
                  } else {
                    rhf.onChange(selected?.value);
                  }
                }}
                placeholder={`Select ${field.label}`}
              />
            )}
          />
          {renderError(field.name) && (
            <p className={styles.error}>{renderError(field.name)}</p>
          )}
        </>
      );
    }

    /* ================= DATE ================= */
    if (field.type === "date") {
      return (
        <>
          <Controller
            name={field.name}
            control={control}
            render={({ field: f }) => <input type="date" {...f} />}
          />
          {renderError(field.name) && (
            <p className={styles.error}>{renderError(field.name)}</p>
          )}
        </>
      );
    }

    /* ================= RADIO ================= */
    if (field.type === "radio") {
      return (
        <>
          <Controller
            name={field.name}
            control={control}
            render={({ field: f }) => (
              <div className={styles.radioGroup}>
                {field.options.map((opt: any) => (
                  <label key={opt.value}>
                    <input
                      type="radio"
                      value={opt.value}
                      checked={f.value === opt.value}
                      onChange={() => f.onChange(opt.value)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            )}
          />
          {renderError(field.name) && (
            <p className={styles.error}>{renderError(field.name)}</p>
          )}
        </>
      );
    }

    /* ================= IMAGE ================= */
    if (field.type === "image") {
      return (
        <>
          <Controller
            name={field.name}
            control={control}
            render={({ field: f }) => (
              <ImagePicker value={f.value} onChange={f.onChange} />
            )}
          />
          {renderError(field.name) && (
            <p className={styles.error}>{renderError(field.name)}</p>
          )}
        </>
      );
    }

    /* ================= EDITOR ================= */
    if (field.type === "editor") {
      return (
        <>
          <Controller
            name={field.name}
            control={control}
            render={({ field: f }) => (
              <RichEditor value={f.value} onChange={f.onChange} />
            )}
          />
          {renderError(field.name) && (
            <p className={styles.error}>{renderError(field.name)}</p>
          )}
        </>
      );
    }

    /* ================= BOTH IMAGE + INPUT (MODAL) ================= */
    if (field.type === "bothImageInput") {
      return (
        <>
          {/* Trigger */}
          <button
            type="button"
            className={styles.imageInputTrigger}
            onClick={() => setActiveModalField(field)}
          >
            Configure {field.label}
          </button>

          {/* Modal */}
          <Modal
            open={activeModalField?.imageField === field.imageField}
            onClose={() => setActiveModalField(null)}
          >
            <h3>{field.label}</h3>

            {/* Image */}
            <Controller
              name={field.imageField}
              control={control}
              render={({ field: f }) => (
                <ImagePicker value={f.value} onChange={f.onChange} />
              )}
            />

            {/* Inputs */}
            {field.inputs.map((input: any) => (
              <div key={input.name} className={styles.field}>
                <label>{input.label}</label>
                <Controller
                  name={input.name}
                  control={control}
                  render={({ field: f }) => (
                    <input {...f} placeholder={input.placeholder} />
                  )}
                />
                {renderError(input.name) && (
                  <p className={styles.error}>{renderError(input.name)}</p>
                )}
              </div>
            ))}
          </Modal>
        </>
      );
    }

    /* ================= ACTION ================= */
    if (field.type === "action") {
      return (
        <button
          type="submit"
          className={
            field?.variant == "secondary"
              ? styles.secondaryBtn
              : styles.inlineBtn
          }
          disabled={loading}
          onClick={() => {
            onActionClick?.(field.action);
          }}
        >
          {loading ? "Submitting..." : field.action}
        </button>
      );
    }

    return null;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {config.map((item: any, i: number) => {
        // 🟢 ROW LAYOUT
        if (item.row && Array.isArray(item.fields)) {
          return (
            <div key={i} className={styles.row}>
              {item.fields.map((field: any, idx: number) => (
                <div key={field.name || idx} className={styles.field}>
                  {field.label && <label>{field.label}</label>}
                  {renderField(field, idx)}
                </div>
              ))}
            </div>
          );
        }

        // 🔵 NORMAL FIELD
        return (
          <div key={item.name || i} className={styles.field}>
            {item.label && <label>{item.label}</label>}
            {renderField(item)}
          </div>
        );
      })}
    </form>
  );
}
