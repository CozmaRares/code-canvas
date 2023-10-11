import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HardDriveDownload } from "lucide-react";

type Props = {
  className?: string;
};

// TODO:
const ExportButton = ({ className }: Props) => (
  <Button
    variant="outline"
    className={cn("flex items-center gap-3", className)}
  >
    Export Code
    <HardDriveDownload className="scale-[0.8]" />
  </Button>
);

export default ExportButton;
