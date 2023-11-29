import { variableAssignBlockColor } from "@/lib/block-colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";
import BlockInput from "@/components/blocks/utils/BlockInput";
import {
  type CodeBlockProps,
  GenericCodeBlockModelWithChildren,
} from "@/components/blocks/utils/code-block";
import store from "@/lib/store";
import { numberBlockType } from "./NumberBlock";
import { variableNameBlockType } from "./VariableNameBlock";
import ChildrenBlockList from "./utils/ChildrenBlockList";
import { operatorBlockType } from "./OperatorBlock";
import DropArea from "../DropArea";

export const variableAssignBlockType = "variable assign" as const;
export type VariableAssignBlockProps = {
  variable: string;
};

type ChildrenTypes =
  | typeof numberBlockType
  | typeof variableNameBlockType
  | typeof operatorBlockType;

export class VariableAssignBlockModel
  implements GenericCodeBlockModelWithChildren<VariableAssignBlockProps>
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

const VariableAssignBlock = ({ id, blockProps }: CodeBlockProps) => {
  const model = store.getModel(id) as VariableAssignBlockModel;
  const variable = model.props.variable;
  const children = model.children;

  return (
    <div className="flex flex-row">
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
      <CodeBlock
        bg={variableAssignBlockColor}
        topSlot
        bottomSlot
        rightSlot
        {...blockProps}
      >
        let
        <BlockInput
          text={variable ?? ""}
          setText={variable => store.setProps(id, { variable })}
          placeholder="variable"
          pattern="identifier"
          className="w-[15ch]"
        />
        be
      </CodeBlock>
      <ChildrenBlockList
        parent={model}
        list={children}
      />
    </div>
  );
};

export default VariableAssignBlock;
