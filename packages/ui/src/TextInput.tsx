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
      <label
        htmlFor={id}
        className="block text-sm font-medium text-cph-paper mb-1"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        className="bg-cph-navy border border-cph-sky/15 rounded-lg text-cph-paper p-2.5 w-full text-sm focus:ring-2 focus:ring-cph-ochre focus:border-transparent placeholder-cph-sky/70"
        required={requiredValue}
        data-lpignore="true"
        {...props}
      />
    </div>
  );
}
