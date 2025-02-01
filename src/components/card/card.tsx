export const Card = ({
  children,
  id,
  onCheck,
  isChecked = false,
}: {
  children: React.ReactNode;
  id: string;
  onCheck?: (id: string, checked: boolean) => void;
  isChecked?: boolean;
}) => {
  return (
    <div className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow relative">
      <div className="absolute top-2 right-2">
        <input
          type="checkbox"
          onChange={(e) => onCheck?.(id, e.target.checked)}
          className="h-4 w-4 cursor-pointer accent-[#585dff] opacity-80"
          checked={isChecked}
        />
      </div>
      {children}
    </div>
  );
};
