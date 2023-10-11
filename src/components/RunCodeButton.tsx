import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
    className?: string;
};

// TODO:
const RunCodeButton = ({ className }: Props) => (
    <Button
        variant="outline"
        className={cn("flex items-center gap-3", className)}
    >
        Run Code
        <Play className="scale-[0.8]" />
    </Button>
);

export default RunCodeButton;
