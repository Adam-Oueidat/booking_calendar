type DateInputProps = {
  label: string;
  id: string;
  name: string;
  defaultValue: string;
};

export default function DateInput({
  label,
  id,
  name,
  defaultValue,
}: DateInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-200 mb-1"
      >
        {label}
      </label>
      <input
        type="date"
        id={id}
        name={name}
        className="bg-slate-800 border border-slate-700 rounded-lg text-slate-100 p-2.5 w-full text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        defaultValue={defaultValue}
      />
    </div>
  );
}
