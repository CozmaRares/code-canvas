import { operatorBlockColor } from "./utils/colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";
import BlockInput from "@/components/blocks/utils/BlockInput";
import { CodeBlockComponent, GenericCodeBlockModel } from "@/lib/code-block";
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

const OperatorBlock: CodeBlockComponent = ({ id }) => {
  const model = store.getModel(id) as OperatorBlockModel;
  const operator = model.props.operator;

  return (
    <CodeBlock bg={operatorBlockColor}>
      <BlockInput
        text={operator}
        setText={operator => store.setProps(id, { operator })}
        placeholder=""
        pattern="operator"
      />
    </CodeBlock>
  );
};

export default OperatorBlock;
