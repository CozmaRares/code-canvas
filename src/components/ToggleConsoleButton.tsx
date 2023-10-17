import { Button } from "@/components/ui/button";
import { useConsoleContext } from "@/context/console";

type Props = {
  className?: string;
};

const ToggleConsoleButton = ({ className }: Props) => {
  const { isOpen, setIsOpen } = useConsoleContext();

  return (
    <Button
      variant="outline"
      className={className}
      onClick={() => setIsOpen(prev => !prev)}
    >
      {isOpen ? "Close" : "Open"} Console
    </Button>
  );
};
export default ToggleConsoleButton;
