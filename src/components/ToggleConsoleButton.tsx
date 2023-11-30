import { Button } from "@/components/ui/button";
import { useConsoleContext } from "@/context/console";
import { ComponentJSX } from "@/lib/helper-types";

type Props = {
  className?: string;
};

const ToggleConsoleButton: ComponentJSX<Props> = ({ className }) => {
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
