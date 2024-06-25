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
      <label htmlFor={id}>{label}</label>
      <input
        type="date"
        id={id}
        name={name}
        className="bg-blue-200 block border w-full p-2 rounded text-gray-700"
        defaultValue={defaultValue}
      />
    </div>
  );
}
