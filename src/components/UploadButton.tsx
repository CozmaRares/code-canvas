import { HardDriveUpload } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { useRef } from "react";
import PythonConverter from "@/lib/PythonConverter";

type Props = {
  className?: string;
};

function upload(inputRef: React.RefObject<HTMLInputElement>) {
  if (inputRef.current!.files == null) return;

  const fileToLoad = inputRef.current!.files[0];

  const fileReader = new FileReader();

  fileReader.onload = fileLoadedEvent => {
    const textFromFileLoaded = fileLoadedEvent.target!.result;
    PythonConverter.fromPython.load(textFromFileLoaded);
  };
  fileReader.readAsText(fileToLoad, "ascii");
}

const UploadButton = ({ className }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({
          variant: "outline",
          size: "default",
          className: ["flex items-center gap-3", className],
        })}
      >
        Upload Code
        <HardDriveUpload className="scale-[0.8]" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Upload code file</DialogTitle>
          <DialogDescription className="flex flex-col justify-center gap-4">
            {/* FIXME: always black 'browse' */}
            <Input
              ref={ref}
              className="cursor-pointer"
              type="file"
              id="upload"
              name="upload"
            />
            <Button
              variant="outline"
              onClick={() => upload(ref)}
            >
              Upload
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
