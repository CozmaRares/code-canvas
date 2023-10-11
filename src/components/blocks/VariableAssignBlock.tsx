import { variableAssignBlockColor } from "@/lib/block-colors";
import CodeBlock from "./utils/CodeBlock";
import TypeLabel from "./utils/TypeLabel";
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
      <TypeLabel
        text={variable ?? ""}
        setText={variable => setProps(idx, { variable })}
        placeholder="variable"
      />
      be
      <TypeLabel
        text={value ?? ""}
        setText={value => setProps(idx, { value })}
        placeholder="value"
      />
    </CodeBlock>
  );
};

export default VariableAssignBlock;
