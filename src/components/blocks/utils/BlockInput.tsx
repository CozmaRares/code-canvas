import { Input } from "@/components/ui/input";
import { ComponentJSX } from "@/lib/helper-types";
import { SUPPORTED_OPERATORS } from "@/lib/operators";

const patterns = Object.freeze({
  identifier: /^([_a-zA-Z][_a-zA-Z0-9]{0,9}){0,1}$/,
  number: /^\d*$/,
  operator: new RegExp(
    `^(${Object.keys(SUPPORTED_OPERATORS)
      .map(key => "\\" + key)
      .join("|")}){0,1}$`,
  ),
} satisfies Record<string, RegExp>);

type Props = {
  text: string;
  setText: (text: string) => void;
  placeholder: string;
  pattern?: keyof typeof patterns;
};

const BlockInput: ComponentJSX<Props> = ({
  text,
  setText,
  placeholder,
  pattern,
}) => {
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
      className="mx-auto h-[2.3em] w-[100px] text-center font-mono"
    />
  );
};

export default BlockInput;
