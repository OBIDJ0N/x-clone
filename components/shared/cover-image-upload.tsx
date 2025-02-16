import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdEdit } from "react-icons/md";
import { IoIosCloudDownload } from "react-icons/io";
import Image from "next/image";

interface Props {
  coverImage: string;
  onChange: (coverImage: string) => void;
}

export default function CoverImageUpload({ coverImage, onChange }: Props) {
  const [image, setImage] = useState(coverImage);

  const handleChange = useCallback(
    (coverImage: string) => {
      onChange(coverImage);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (evt: any) => {
        setImage(evt.target.result);
        handleChange(evt.target.result);
      };
      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getInputProps, getRootProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });
  return (
    <div
      {...getRootProps({
        className:
          "text-white text-center border-none rounded-md w-full h-[200px] bg-neutral-700 cursor-pointer",
      })}
    >
      <input {...getInputProps()} />
      {image ? (
        <div className="w-full h-[200px] relative left-0 right-8">
          <Image
            src={image}
            fill
            alt="Uploaded image"
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-8 flex justify-center items-center">
            <MdEdit size={24} className="text-white" />
          </div>
        </div>
      ) : (
        <div className="h-full flex justify-center cursor-pointer flex-col items-center gap-2">
          <IoIosCloudDownload size={50} />
          <p>Upload cover image</p>
        </div>
      )}
    </div>
  );
}
