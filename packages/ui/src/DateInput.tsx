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
        className="block text-sm font-medium text-cph-paper mb-1"
      >
        {label}
      </label>
      <input
        type="date"
        id={id}
        name={name}
        className="bg-cph-navy border border-cph-sky/15 rounded-lg text-cph-paper p-2.5 w-full text-sm focus:ring-2 focus:ring-cph-ochre focus:border-transparent"
        defaultValue={defaultValue}
      />
    </div>
  );
}
