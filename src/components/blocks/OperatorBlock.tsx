import { operatorBlockColor } from "./utils/colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";
import BlockInput from "@/components/blocks/utils/BlockInput";
import { CodeBlockComponent } from "@/lib/code-block";
import store from "@/lib/store";
import { OperatorBlockModel } from "@/lib/models/operator-model";

const OperatorBlock: CodeBlockComponent = ({ id }) => {
  const model = store.getModel(id) as OperatorBlockModel;
  const operator = model.props.operator;

  return (
    <CodeBlock
      bg={operatorBlockColor}
      id={id}
    >
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
