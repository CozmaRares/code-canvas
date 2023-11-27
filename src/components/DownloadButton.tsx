import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HardDriveDownload } from "lucide-react";
// import { saveAs } from "file-saver";
import PythonConverter from "@/lib/PythonConverter";

type Props = {
  className?: string;
};

function download() {
  //TODO: error handling
  const program = PythonConverter.toPython.program();

  const file = new File([program], "codeCanvas.py", {
    type: "text/plain",
  });

  const link = document.createElement("a");
  const url = URL.createObjectURL(file);

  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

const DownloadButton = ({ className }: Props) => (
  <Button
    variant="outline"
    className={cn("flex items-center gap-3", className)}
    onClick={download}
  >
    Download Code
    <HardDriveDownload className="scale-[0.8]" />
  </Button>
);

export default DownloadButton;
