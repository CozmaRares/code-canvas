import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComponentJSX, cn } from "@/lib/utils";
import { useConsoleContext } from "@/context/console";
import Interpreter from "@/lib/interpreter";

type Props = {
  className?: string;
};

const RunCodeButton: ComponentJSX<Props> = ({ className }) => {
  const { addConsoleText, clearConsole, setDisplayText, setIsOpen } =
    useConsoleContext();

  return (
    <Button
      variant="outline"
      className={cn("flex items-center gap-3", className)}
      onClick={async () => {
        setIsOpen(true);
        setDisplayText(false);
        clearConsole();
        await new Interpreter().start(addConsoleText);
        setDisplayText(true);
      }}
    >
      Run Code
      <Play className="scale-[0.8]" />
    </Button>
  );
};
export default RunCodeButton;
