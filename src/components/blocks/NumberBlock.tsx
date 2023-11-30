import { numberBlockColor } from "./utils/colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";
import BlockInput from "@/components/blocks/utils/BlockInput";
import { CodeBlockComponent, GenericCodeBlockModel } from "@/lib/code-block";
import store from "@/lib/store";

export const numberBlockType = "number" as const;
export type NumberBlockProps = { number: string };

export class NumberBlockModel
  implements GenericCodeBlockModel<NumberBlockProps>
{
  id: string;
  type = numberBlockType;
  props: NumberBlockProps;

  constructor(id: string) {
    this.id = id;
    this.props = { number: "" };
  }
}

const NumberBlock: CodeBlockComponent = ({ id }) => {
  const model = store.getModel(id) as NumberBlockModel;
  const number = model.props.number;

  return (
    <CodeBlock bg={numberBlockColor}>
      <BlockInput
        text={number}
        setText={number => store.setProps(id, { number })}
        placeholder="number"
        pattern="number"
      />
    </CodeBlock>
  );
};

export default NumberBlock;
