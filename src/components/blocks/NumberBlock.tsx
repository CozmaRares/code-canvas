import { valueBlockColor } from "@/lib/block-colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";
import BlockInput from "@/components/blocks/utils/BlockInput";
import type {
  CodeBlockProps,
  GenericCodeBlockModel,
} from "@/components/blocks/utils/code-block";
import store from "@/lib/store";

export const numberBlockType = "number" as const;
export type NumberBlockProps = { number: number };

export class NumberBlockModel
  implements GenericCodeBlockModel<NumberBlockProps>
{
  id: string;
  type = numberBlockType;
  props: NumberBlockProps;

  constructor(id: string) {
    this.id = id;
    this.props = { number: 0 };
  }
}

const VariableNameBlock = ({ id, blockProps }: CodeBlockProps) => {
  const model = store.getModel(id) as NumberBlockModel;
  const number = model.props.number;

  // FIXME: NaN when deleting all digits
  return (
    <CodeBlock
      bg={valueBlockColor}
      leftSlot
      rightSlot
      {...blockProps}
    >
      <BlockInput
        text={`${number}`}
        setText={number => store.setProps(id, { number: parseInt(number) })}
        placeholder="number"
        pattern="number"
        className=""
      />
    </CodeBlock>
  );
};

export default VariableNameBlock;
