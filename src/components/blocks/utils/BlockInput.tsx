import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const patterns = Object.freeze({
  identifier: /^([_a-zA-Z][_a-zA-Z0-9]{0,9}){0,1}$/,
  number: /^\d*$/,
} satisfies Record<string, RegExp>);

type Props = {
  text: string;
  setText: (text: string) => void;
  placeholder: string;
  pattern?: keyof typeof patterns;
  className?: string;
};

const BlockInput = ({
  text,
  setText,
  placeholder,
  pattern,
  className,
}: Props) => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const text = e.target.value;
    if (pattern == undefined) return setText(text);
    const regex = patterns[pattern];
    if (regex == undefined || regex.test(text)) setText(text);
  };

  return (
    <Input
      placeholder={placeholder}
      value={text}
      onChange={onChange}
      className={cn("h-[2.3em] w-[100px] font-mono", className)}
    />
  );
};

export default BlockInput;
