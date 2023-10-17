import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useConsoleContext } from "@/context/console";
import Interpreter from "@/lib/Interpreter";

type Props = {
  className?: string;
};

// TODO: remove me
async function sleep(s: number) {
  return new Promise(resolve => setTimeout(resolve, s * 1000));
}

const RunCodeButton = ({ className }: Props) => {
  const { addOutputText, resetOutput, setDisplayOuput, setIsOpen } =
    useConsoleContext();

  const onClick = async () => {
    setIsOpen(true);
    setDisplayOuput(false);
    resetOutput();
    await sleep(1);
    await new Interpreter().start(addOutputText);
    setDisplayOuput(true);
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
