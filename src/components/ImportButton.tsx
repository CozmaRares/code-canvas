import { HardDriveUpload } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

// TODO:
const ImportButton = ({ className }: Props) => (
  <Button
    variant="outline"
    className={cn("flex items-center gap-3", className)}
  >
    Import Code
    <HardDriveUpload className="scale-[0.8]" />
  </Button>
);

export default ImportButton;
