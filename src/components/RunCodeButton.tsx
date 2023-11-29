import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useConsoleContext } from "@/context/console";
import Interpreter from "@/lib/Interpreter";

type Props = {
  className?: string;
};

const RunCodeButton = ({ className }: Props) => {
  const { addConsoleText, clearConsole, setDisplayText, setIsOpen } =
    useConsoleContext();

  const onClick = async () => {
    setIsOpen(true);
    setDisplayText(false);
    clearConsole();
    await new Interpreter().start(addConsoleText, clearConsole);
    setDisplayText(true);
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
