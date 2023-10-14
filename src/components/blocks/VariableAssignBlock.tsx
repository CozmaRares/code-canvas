import { variableAssignBlockColor } from "@/lib/block-colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";
import BlockInput from "@/components/blocks/utils/BlockInput";
import type {
  CodeBlockProps,
  GenericCodeBlockModel,
} from "@/components/blocks/utils/code-block";
import store from "@/lib/store";

export const variableAssignBlockType = "variable assign" as const;
export type VariableAssignBlockProps = { variable: string; value: string };

export class VariableAssignBlockModel
  implements GenericCodeBlockModel<VariableAssignBlockProps>
{
  id: string;
  type = variableAssignBlockType;
  props: VariableAssignBlockProps;

  constructor(id: string) {
    this.id = id;
    this.props = { variable: "", value: "" };
  }
}

const VariableAssignBlock = ({ id, blockProps }: CodeBlockProps) => {
  const model = store.getModel(id) as VariableAssignBlockModel;
  const variable = model.props["variable"];
  const value = model.props["value"];

  return (
    <CodeBlock
      key={id}
      bg={variableAssignBlockColor}
      topSlot
      bottomSlot
      {...blockProps}
    >
      let
      <BlockInput
        text={variable ?? ""}
        setText={variable => store.setProps(id, { variable })}
        placeholder="variable"
        pattern="identifier"
        className="w-[20ch]"
      />
      be
      <BlockInput
        text={value ?? ""}
        setText={value => store.setProps(id, { value })}
        placeholder="value"
        className="w-[150px]"
      />
    </CodeBlock>
  );
};

export default VariableAssignBlock;
