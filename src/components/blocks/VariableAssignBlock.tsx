import { variableAssignBlockColor } from "@/lib/block-colors";
import CodeBlock from "./utils/CodeBlock";
import BlockInput from "./utils/BlockInput";
import { CodeBlockProps } from "./utils/code-block";

export type VariableAssignProps = {
  variable: string;
  value: string;
};

const VariableAssignBlock = ({ idx, setProps, getProp }: CodeBlockProps) => {
  const variable = getProp(idx, "variable") as string | null;
  const value = getProp(idx, "value") as string | null;

  return (
    <CodeBlock
      key={idx}
      bg={variableAssignBlockColor}
      topSlot
      bottomSlot
    >
      let
      <BlockInput
        text={variable ?? ""}
        setText={variable => setProps(idx, { variable })}
        placeholder="variable"
        className="w-[150px]"
      />
      be
      <BlockInput
        text={value ?? ""}
        setText={value => setProps(idx, { value })}
        placeholder="value"
        className="w-[150px]"
      />
    </CodeBlock>
  );
};

export default VariableAssignBlock;