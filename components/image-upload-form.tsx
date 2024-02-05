"use client"; // Make this component a client component
// components/FileUploadForm.tsx
import React, { useState } from "react";
import CustomFileSelector from "./choose-image";
import ImagePreview from "./image-preview";

const FileUploadForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //convert `FileList` to `File[]`
      const _files = Array.from(e.target.files);
      setImages(_files);
    }
  };
  return (
    <form className="w-full">
      <CustomFileSelector
        accept="image/png, image/jpeg"
        onChange={handleFileSelected}
      />
      <ImagePreview images={images} />
    </form>
  );
};

export default FileUploadForm;
