import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HardDriveDownload } from "lucide-react";
import PythonConverter from "@/lib/python-converter";
import { ComponentJSX } from "@/lib/helper-types";
import Interpreter from "@/lib/interpreter";

type Props = {
  className?: string;
};

async function download(): Promise<void> {
  const isProgramCorrect = await new Interpreter().start();

  if (!isProgramCorrect) return;

  const program = PythonConverter.program();

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

const DownloadButton: ComponentJSX<Props> = ({ className }) => (
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
