import { variableAssignBlockColor } from "./utils/colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";
import BlockInput from "@/components/blocks/utils/BlockInput";
import { CodeBlockComponent } from "@/lib/code-block";
import store from "@/lib/store";
import DropArea from "../DropArea";
import Expression from "./utils/Expression";
import {
  VariableAssignBlockModel,
  variableAssignBlockType,
} from "@/lib/models/variable-assignment-model";

const VariableAssignBlock: CodeBlockComponent = ({ id }) => {
  const model = store.getModel(id) as VariableAssignBlockModel;
  const variable = model.props.variable;
  const expressionList = model.expressionList;

  return (
    <div className="relative flex w-fit flex-row gap-1">
      <DropArea
        id={`${id}-right`}
        data={{
          type: variableAssignBlockType,
          id: id,
          isCodeBlock: true,
          isRightDrop: true,
        }}
        className="-right-2 bottom-0 top-0 w-2 rounded-lg"
      />
      <CodeBlock
        bg={variableAssignBlockColor}
        id={id}
      >
        let
        <BlockInput
          text={variable ?? ""}
          setText={variable => store.setProps(id, { variable })}
          placeholder="variable"
          pattern="identifier"
        />
        be
      </CodeBlock>
      <Expression list={expressionList} />
    </div>
  );
};

export default VariableAssignBlock;
