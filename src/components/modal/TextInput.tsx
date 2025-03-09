type TextInputProps = {
  label?: string;
  id?: string;
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  requiredValue?: boolean;
  styling?: string;
};

export default function TextInput({
  label,
  id,
  name,
  placeholder,
  requiredValue,
  styling,
  ...props
}: TextInputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={styling}>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        className="bg-blue-200 rounded border text-gray-900 p-2.5 w-full text-sm"
        required={requiredValue}
        data-lpignore="true"
        {...props}
      />
    </div>
  );
}
