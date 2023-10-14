import { variableAssignBlockColor } from "@/lib/block-colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";
import BlockInput from "@/components/blocks/utils/BlockInput";
import type {
  CodeBlockProps,
  GenericCodeBlockModel,
} from "@/components/blocks/utils/code-block";
import store from "@/lib/store";

export const variableNameBlockType = "variable name" as const;
export type VariableNameBlockProps = { variable: string };

export class VariableNameBlockModel
  implements GenericCodeBlockModel<VariableNameBlockProps>
{
  id: string;
  type = variableNameBlockType;
  props: VariableNameBlockProps;

  constructor(id: string) {
    this.id = id;
    this.props = { variable: "" };
  }
}

const VariableNameBlock = ({ id, blockProps }: CodeBlockProps) => {
  const model = store.getModel(id) as VariableNameBlockModel;
  const variable = model.props["variable"];

  return (
    <CodeBlock
      key={id}
      bg={variableAssignBlockColor}
      leftSlot
      rightSlot
      {...blockProps}
    >
      <BlockInput
        text={variable ?? ""}
        setText={variable => store.setProps(id, { variable })}
        placeholder="variable"
        pattern="identifier"
        className="mr-3 w-[20ch]"
      />
    </CodeBlock>
  );
};

export default VariableNameBlock;
