import Field from "./Field";

export default function CheckboxField({
  id,
  labelText,
  errorList,
  value,
  onChange,
  name,
  required,
}) {
  return (
    <Field htmlFor={id} labelText={labelText} errorList={errorList}>
      <span>
        <input
          value={value}
          onChange={onChange}
          name={name}
          type="checkbox"
          required={required}
        />
      </span>
    </Field>
  );
}
