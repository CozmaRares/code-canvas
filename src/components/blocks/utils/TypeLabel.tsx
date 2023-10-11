import { Input } from "@/components/ui/input";

type Props = {
  text: string;
  setText: (text: string) => void;
  placeholder: string;
};

const TypeLabel = ({ text, setText, placeholder }: Props) => {
  return (
    <Input
      placeholder={placeholder}
      value={text}
      onChange={e => setText(e.target.value)}
      className="h-[2.5em] min-w-fit max-w-fit"
    />
  );
};

export default TypeLabel;
