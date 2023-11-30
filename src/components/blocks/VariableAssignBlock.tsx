import { variableAssignBlockColor } from "./utils/colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";
import BlockInput from "@/components/blocks/utils/BlockInput";
import {
  CodeBlockComponent,
  GenericCodeBlockModelWithExpression,
} from "@/lib/code-block";
import store from "@/lib/store";
import { numberBlockType } from "./NumberBlock";
import { variableNameBlockType } from "./VariableNameBlock";
import { operatorBlockType } from "./OperatorBlock";
import DropArea from "../DropArea";
import Expression from "./utils/Expression";

export const variableAssignBlockType = "variable assign" as const;
export type VariableAssignBlockProps = {
  variable: string;
};

type ChildrenTypes =
  | typeof numberBlockType
  | typeof variableNameBlockType
  | typeof operatorBlockType;

export class VariableAssignBlockModel
  implements GenericCodeBlockModelWithExpression<VariableAssignBlockProps>
{
  id: string;
  type = variableAssignBlockType;
  props: VariableAssignBlockProps;
  childrenTypes = Object.freeze([
    numberBlockType,
    variableNameBlockType,
    operatorBlockType,
  ] satisfies ChildrenTypes[]);
  children: Array<{
    id: string;
    type: ChildrenTypes;
  }> = [];
  maxChildrenLength = 3;

  constructor(id: string) {
    this.id = id;
    this.props = { variable: "" };
  }
}

const VariableAssignBlock: CodeBlockComponent = ({ id }) => {
  const model = store.getModel(id) as VariableAssignBlockModel;
  const variable = model.props.variable;
  const children = model.children;

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
        className="bottom-0 right-0 top-0 w-4 rounded-r-lg"
      />
      <CodeBlock bg={variableAssignBlockColor}>
        let
        <BlockInput
          text={variable ?? ""}
          setText={variable => store.setProps(id, { variable })}
          placeholder="variable"
          pattern="identifier"
        />
        be
      </CodeBlock>
      <Expression list={children} />
    </div>
  );
};

export default VariableAssignBlock;
