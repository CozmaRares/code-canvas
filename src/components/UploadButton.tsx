import { HardDriveUpload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

// TODO:
const UploadButton = ({ className }: Props) => (
  <Button
    variant="outline"
    className={cn("flex items-center gap-3", className)}
  >
    Upload Code
    <HardDriveUpload className="scale-[0.8]" />
  </Button>
);

export default UploadButton;