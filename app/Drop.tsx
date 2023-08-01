import { useDropzone } from "react-dropzone";
import "react-dropzone/examples/theme.css";

import { MetricReport } from "@/generate-report";

export const Drop = ({
  onDropReport,
}: {
  onDropReport: (report: MetricReport) => void;
}) => {
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
          onDropReport(JSON.parse(contents) as MetricReport);
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
