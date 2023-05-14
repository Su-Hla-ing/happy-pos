import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onFileSelected: (acceptedFiles: File[]) => void;
}
const FileDropZone = ({ onFileSelected }: Props) => {
  const onDrop = useCallback((file: File[]) => {
    onFileSelected(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        borderRadius: 4,
        border: "3px dotted lightgray",
        textAlign: "center",
        padding: 1,
        paddingLeft: "1rem",
        paddingRight: "1rem",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};
export default FileDropZone;
