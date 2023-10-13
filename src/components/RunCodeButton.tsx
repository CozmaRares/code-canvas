import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useOutputContext } from "@/context/output";
import Interpreter from "@/lib/Interpreter";

type Props = {
  className?: string;
};

const RunCodeButton = ({ className }: Props) => {
  const { addOutputText, resetOutput } = useOutputContext();

  const onClick = () => {
    resetOutput();
    new Interpreter().start(addOutputText);
  };

  return (
    <Button
      variant="outline"
      className={cn("flex items-center gap-3", className)}
      onClick={onClick}
    >
      Run Code
      <Play className="scale-[0.8]" />
    </Button>
  );
};

export default RunCodeButton;
