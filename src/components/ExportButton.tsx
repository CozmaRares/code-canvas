import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { HardDriveUpload } from "lucide-react";

type Props = {
    className?: string;
};

const ExportButton = ({ className }: Props) => (
    <Button
        variant="outline"
        className={cn("flex items-center gap-3", className)}
    >
        Export Code
        <HardDriveUpload className="scale-[0.8]" />
    </Button>
);

export default ExportButton;
