import { variableNameBlockColor } from "./utils/colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";
import BlockInput from "@/components/blocks/utils/BlockInput";
import { CodeBlockComponent } from "@/lib/code-block";
import store from "@/lib/store";
import { VariableNameBlockModel } from "@/lib/models/variable-name-model";

const VariableNameBlock: CodeBlockComponent = ({ id }) => {
  const model = store.getModel(id) as VariableNameBlockModel;
  const variable = model.props["variable"];

  return (
    <CodeBlock
      bg={variableNameBlockColor}
      id={id}
    >
      <BlockInput
        text={variable ?? ""}
        setText={variable => store.setProps(id, { variable })}
        placeholder="variable"
        pattern="identifier"
      />
    </CodeBlock>
  );
};

export default VariableNameBlock;
