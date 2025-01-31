import { ButtonRemove } from "@/components";

export const UploadedImage = ({
  file,
  index,
  handleRemoveFile,
  isEditing,
}: {
  file: File;
  index: number;
  handleRemoveFile: (index: number) => void;
  isEditing: boolean;
}) => {
  return (
    <div
      style={{
        position: "relative",
        maxWidth: "200px",
        maxHeight: "300px",
        minWidth: "200px",
        minHeight: "300px",
      }}
      className="relative"
    >
      <img
        src={URL.createObjectURL(file)}
        alt={`Preview`}
        className="max-w-[200px] max-h-[300px] object-cover rounded-lg"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {isEditing && (
        <ButtonRemove onClick={() => handleRemoveFile(index)} />
      )}
    </div>
  );
};
