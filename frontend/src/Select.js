import styles from "./Select.module.css";

export default function Select({ onChange, value, id, options, name }) {
  return (
    <div className={styles.main}>
      <select onChange={onChange} value={value} id={id} name={name}>
        <option value="">---</option>
        {options.map((option, index) => {
          const props = {
            key: index,
            value: option.value,
          };
          if (option.disabled) {
            props.disabled = true;
          }
          return <option {...props}>{option.text}</option>;
        })}
      </select>
    </div>
  );
}
