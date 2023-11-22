import Field from "./Field";
import Select from "./Select";

export default function SelectField({
  id,
  labelText,
  errorList,
  value,
  options,
  onChange,
  name,
}) {
  return (
    <Field htmlFor={id} labelText={labelText} errorList={errorList}>
      <Select
        id={id}
        value={value}
        options={options}
        onChange={onChange}
        name={name}
      />
    </Field>
  );
}
