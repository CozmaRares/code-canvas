import { valueBlockColor } from "@/lib/block-colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";
import BlockInput from "@/components/blocks/utils/BlockInput";
import type {
  CodeBlockProps,
  GenericCodeBlockModel,
} from "@/components/blocks/utils/code-block";
import store from "@/lib/store";

export const operatorBlockType = "operator" as const;
export type OperatorBlockProps = { operator: string };

export class OperatorBlockModel
  implements GenericCodeBlockModel<OperatorBlockProps>
{
  id: string;
  type = operatorBlockType;
  props: OperatorBlockProps;

  constructor(id: string) {
    this.id = id;
    this.props = { operator: "+" };
  }
}

const OperatorBlock = ({ id, blockProps }: CodeBlockProps) => {
  const model = store.getModel(id) as OperatorBlockModel;
  const operator = model.props.operator;

  return (
    <CodeBlock
      bg={valueBlockColor}
      leftSlot
      rightSlot
      {...blockProps}
    >
      <BlockInput
        text={operator}
        setText={operator => store.setProps(id, { operator })}
        placeholder=""
        pattern="operator"
        className="mx-auto w-[10ch] text-center"
      />
    </CodeBlock>
  );
};

export default OperatorBlock;
