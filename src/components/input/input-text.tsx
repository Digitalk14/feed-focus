"use client";

export const InputText = ({
  name,
  value,
  onChange,
  label,
}: {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
}) => {
  return (
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
      <span className="text-red-500">*</span>
      <input
        type="text"
        id={name}
        name={name}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#585dff] focus:outline-none focus:ring-1 focus:ring-[#585dff]"
      />
    </label>
  );
};
