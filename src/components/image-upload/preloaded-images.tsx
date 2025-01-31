import { extractImageName } from "@/utils";
import { ButtonRemove } from "@/components";

export const PreloadedImages = ({
  mediaData,
  isEditing,
  handleRemoveFile,
  index,
}: {
  mediaData: any;
  isEditing: boolean;
  handleRemoveFile: (index: number) => void;
  index: number;
}) => {
  return (
    <div key={mediaData.id} className="relative w-[200px] h-[300px]">
      <img
        src={mediaData.signedUrl || ""}
        alt={`Image`}
        className="object-cover rounded-lg w-full h-full"
      />
      <p className="absolute bottom-0 left-0  bg-black-300 text-white px-2 py-1 rounded-lg">
        {extractImageName(mediaData.path)}
      </p>
      {isEditing && <ButtonRemove onClick={() => handleRemoveFile(index)} />}
    </div>
  );
};
