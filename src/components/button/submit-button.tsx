import { Spinner } from "../spinner";

export const SubmitButton = ({
  isSubmitDisabled,
  isLoading,
}: {
  isSubmitDisabled: boolean;
  isLoading: boolean;
}) => {
  return (
    <button
      type="submit"
      style={{
        height: "50px",
        opacity: isSubmitDisabled ? 0.5 : 1,
        cursor: isSubmitDisabled ? "not-allowed" : "pointer",
      }}
      disabled={isSubmitDisabled || isLoading}
      className={`flex items-center justify-center border border-[#e0e0e0] bg-[#585dff] text-white cursor-pointer hover:bg-[#4146ff] rounded-lg shadow-sm w-[200px] h-[50px] ${
        isSubmitDisabled && "opacity-50"
      }`}
    >
      {isLoading ? <Spinner /> : "Save"}
    </button>
  );
};
