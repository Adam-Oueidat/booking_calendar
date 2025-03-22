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
        className="block text-sm font-medium text-gray-300 mb-1"
      >
        {label}
      </label>
      <input
        type="date"
        id={id}
        name={name}
        className="bg-gray-700 border border-gray-600 rounded-lg text-gray-100 p-2.5 w-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        defaultValue={defaultValue}
      />
    </div>
  );
}
