import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  setText: (text: string) => void;
  placeholder: string;
  className?: string;
};

const BlockInput = ({ text, setText, placeholder, className }: Props) => {
  return (
    <Input
      placeholder={placeholder}
      value={text}
      onChange={e => setText(e.target.value)}
      className={cn("h-[2.5em]", className)}
    />
  );
};

export default BlockInput;
