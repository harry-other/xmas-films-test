import Field from "./Field";

export default function InputField({
  id,
  labelText,
  errorList,
  value,
  onChange,
  name,
  autoComplete,
  type,
}) {
  return (
    <Field htmlFor={id} labelText={labelText} errorList={errorList}>
      <input
        value={value}
        onChange={onChange}
        name={name}
        autoComplete={autoComplete}
        type={type}
      ></input>
    </Field>
  );
}
