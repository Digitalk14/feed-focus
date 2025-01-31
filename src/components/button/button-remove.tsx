"use client";

export const ButtonRemove = ({
  onClick,
}: {
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      style={{
        position: "absolute",
        top: "5px",
        right: "5px",
        fontSize: "20px",
        backgroundColor: "white",
        borderRadius: "50%",
        padding: "5px",
        cursor: "pointer",
        width: "25px",
        height: "25px",
      }}
      className="absolute -top-2 -right-2 bg-red-500 text-[#333] rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
      onClick={onClick}
    >
      ×
    </button>
  );
};
