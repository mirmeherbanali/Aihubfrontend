// components/FormRenderer.tsx
import ImagePicker from "./ImagePicker";
import RichEditor from "./RichEditor";
import styles from "../../../ui/style/BlogEditor.module.scss"

export default function FormRenderer({ config, state, setState }: any) {
  const update = (name: string, value: any) =>
    setState((prev: any) => ({ ...prev, [name]: value }));

  const renderField = (field: any) => {
    if (field.type === "text")
      return <input value={state[field.name] || ""} placeholder={field.placeholder} onChange={e => update(field.name, e.target.value)} />;

    if (field.type === "select")
      return (
        <select onChange={e => update(field.name, e.target.value)}>
          <option>Select...</option>
          {field.options.map((o: string) => <option key={o}>{o}</option>)}
        </select>
      );

    if (field.type === "date")
      return <input type="date" value={state[field.name] || ""} onChange={e => update(field.name, e.target.value)} />;

    if (field.type === "image")
      return <ImagePicker value={state[field.name]} onChange={(f: File) => update(field.name, f)} />;

    if (field.type === "editor")
      return <RichEditor value={state[field.name]} onChange={(v: string) => update(field.name, v)} />;
    
    if(field.type === "textarea") 
       return <textarea
          value={state[field.name] || ""}
          placeholder={field.placeholder}
          onChange={(e) => update(field.name, e.target.value)}
        />
    if (field.type === "radio") {
  return (
    <div className={styles.radioGroup}>
      {field.options.map((opt: any) => (
        <label key={opt.value}>
          <input
            type="radio"
            name={field.name}
            value={opt.value}
            checked={state[field.name] === opt.value}
            onChange={() => update(field.name, opt.value)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}


    if (field.type === "action")
      return (
        <button
          type="button"
          className={styles.inlineBtn}
          onClick={() => alert(field.action)}
        >
          {field.action}
        </button>
      );
  };

  return config.map((item: any, i: number) => {
    if (item.row) {
      return (
        <div key={i} className={styles.row}>
          {item.fields.map((f: any) => (
            <div key={f.name || f.label} className={styles.field}>
              {f.label && <label>{f.label}</label>}
              {renderField(f)}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div key={item.name} className={styles.field}>
        <label>{item.label}</label>
        {renderField(item)}
      </div>
    );
  });
}

