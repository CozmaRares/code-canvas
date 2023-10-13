import { variableAssignBlockColor } from "@/lib/block-colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";
import BlockInput from "@/components/blocks/utils/BlockInput";
import type { CodeBlockProps } from "@/components/blocks/utils/code-block";
import store from "@/lib/store";

export const variableAssignBlockType = "variable assign" as const;
export type VariableAssignBlockProps = { variable: string; value: string };

export class VariableAssignBlockModel {
  id: string;
  type = variableAssignBlockType;
  props: VariableAssignBlockProps;

  constructor(id: VariableAssignBlockModel["id"]) {
    this.id = id;
    this.props = { variable: "", value: "" };
  }
}

const VariableAssignBlock = ({ idx, blockProps }: CodeBlockProps) => {
  const model = store.getModel(idx);
  const variable = model.props["variable"];
  const value = model.props["value"];

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
        setText={variable => store.setProps(idx, { variable })}
        placeholder="variable"
        className="w-[150px]"
      />
      be
      <BlockInput
        text={value ?? ""}
        setText={value => store.setProps(idx, { value })}
        placeholder="value"
        className="w-[150px]"
      />
    </CodeBlock>
  );
};

export default VariableAssignBlock;
