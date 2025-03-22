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
        className="block text-sm font-medium text-slate-200 mb-1"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        className="bg-slate-800 border border-slate-700 rounded-lg text-slate-100 p-2.5 w-full text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-400"
        required={requiredValue}
        data-lpignore="true"
        {...props}
      />
    </div>
  );
}
