import { variableAssignBlockColor } from "@/lib/block-colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";
import BlockInput from "@/components/blocks/utils/BlockInput";
import type { CodeBlockProps } from "@/components/blocks/utils/code-block";

export type VariableAssignProps = {
  variable: string;
  value: string;
};

const VariableAssignBlock = ({ idx, setProps, getProp, blockProps }: CodeBlockProps) => {
  const variable = getProp(idx, "variable") as string | null;
  const value = getProp(idx, "value") as string | null;

  return (
    <CodeBlock
      key={idx}
      bg={variableAssignBlockColor}
      topSlot
      bottomSlot
      {...blockProps}
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
