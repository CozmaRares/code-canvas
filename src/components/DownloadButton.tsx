import { ComponentJSX, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HardDriveDownload } from "lucide-react";
import Interpreter from "@/lib/interpreter";
import { toast } from "./ui/use-toast";
import PythonConverter from "@/lib/python-converter";

type Props = {
  className?: string;
};

async function download(): Promise<void | ReturnType<typeof toast>> {
  const isProgramCorrect = await new Interpreter().start();

  if (!isProgramCorrect)
    return toast({
      title: "Syntax error",
      description:
        "The code contains errors. Run the code in the interpreter to see the errors.",
      variant: "destructive",
    });

  const program = PythonConverter.program();

  const file = new File([program.join("\n")], "codeCanvas.py", {
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

const DownloadButton: ComponentJSX<Props> = ({ className }) => {
  return (
    <Button
      variant="outline"
      className={cn("flex items-center gap-3", className)}
      onClick={download}
    >
      Download Code
      <HardDriveDownload className="scale-[0.8]" />
    </Button>
  );
};

export default DownloadButton;
