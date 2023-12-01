import { numberBlockColor } from "./utils/colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";
import BlockInput from "@/components/blocks/utils/BlockInput";
import { CodeBlockComponent } from "@/lib/code-block";
import store from "@/lib/store";
import { NumberBlockModel } from "@/lib/models/number-model";

const NumberBlock: CodeBlockComponent = ({ id }) => {
  const model = store.getModel(id) as NumberBlockModel;
  const number = model.props.number;

  return (
    <CodeBlock
      bg={numberBlockColor}
      id={id}
    >
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
