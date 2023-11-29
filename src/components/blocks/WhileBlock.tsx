import { variableAssignBlockColor } from "@/lib/block-colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";
import {
  type CodeBlockProps,
  GenericCodeBlockModelWithStatements,
  CodeBlockType,
} from "@/components/blocks/utils/code-block";
import store from "@/lib/store";
import { variableNameBlockType } from "./VariableNameBlock";
import ChildrenBlockList from "./utils/ChildrenBlockList";
import StatementList from "./utils/StatementList";
import DropArea from "../DropArea";

export const whileBlockType = "while" as const;
export type WhileBlockProps = Record<string, unknown>;

type ChildrenTypes = typeof variableNameBlockType;

export class WhileBlockModel
  implements GenericCodeBlockModelWithStatements<WhileBlockProps>
{
  id: string;
  type = whileBlockType;
  props: WhileBlockProps;
  childrenTypes = Object.freeze([
    variableNameBlockType,
  ] satisfies ChildrenTypes[]);
  children: Array<{
    id: string;
    type: ChildrenTypes;
  }> = [];
  maxChildrenLength = 1;
  statements: Array<{
    id: string;
    type: CodeBlockType;
  }> = [];

  constructor(id: string) {
    this.id = id;
    this.props = {};
  }
}

const WhileBlock = ({ id, blockProps }: CodeBlockProps) => {
  const model = store.getModel(id) as WhileBlockModel;
  const children = model.children;
  const statements = model.statements;

  return (
    <div className="grid auto-rows-auto grid-cols-[auto,minmax(0,1fr)] gap-x-2 gap-y-1">
      <div className="relative col-span-full flex flex-row">
        <DropArea
          id={`${id}-right`}
          data={{
            type: whileBlockType,
            id: id,
            isCodeBlock: true,
            isRightDrop: true,
          }}
          className="bottom-0 right-0 top-0 w-4 rounded-r-lg"
        />
        <CodeBlock
          bg={variableAssignBlockColor}
          topSlot
          rightSlot
          {...blockProps}
        >
          while
        </CodeBlock>
        <ChildrenBlockList
          parent={model}
          list={children}
        />
      </div>
      <div
        className="bg-block col-span-1 -my-[10px] w-[15px]"
        style={
          {
            "--bg-light": variableAssignBlockColor.light,
            "--bg-dark": variableAssignBlockColor.dark,
          } as React.CSSProperties
        }
      />
      <div className="relative min-h-[60px]">
        <DropArea
          id={`${id}-inner`}
          data={{
            type: whileBlockType,
            id: id,
            isCodeBlock: true,
            isInnerDrop: true,
          }}
          className="inset-0 w-4 rounded-lg"
        />
        <StatementList statements={statements} />
      </div>
      <div className="col-span-full">
        <CodeBlock
          bg={variableAssignBlockColor}
          bottomSlot
          minHeight={5}
          {...blockProps}
        ></CodeBlock>
      </div>
    </div>
  );
};

export default WhileBlock;
