import { useDropzone } from "react-dropzone";
import "react-dropzone/examples/theme.css";

export const Drop = ({onDropReport}: any) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "application/json": [".json"],
    },
    onDrop: ([file]) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const contents = e.target?.result as string;
        if (contents) {
          onDropReport(JSON.parse(contents))
        }
      };
      reader.readAsText(file);
    },
  });

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <p>Drop report file here, or click to select files</p>
    </div>
  );
};
