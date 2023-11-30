import { whileBlockColor } from "./utils/colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";
import {
  CodeBlockComponent,
  GenericCodeBlockModelWithStatements,
  VerticalBlockInfo,
} from "@/lib/code-block";
import store from "@/lib/store";
import { variableNameBlockType } from "./VariableNameBlock";
import StatementList from "./utils/StatementList";
import DropArea from "../DropArea";
import Expression from "./utils/Expression";

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
  statements: Array<VerticalBlockInfo> = [];

  constructor(id: string) {
    this.id = id;
    this.props = {};
  }
}

const WhileBlock: CodeBlockComponent = ({ id }) => {
  const model = store.getModel(id) as WhileBlockModel;
  const children = model.children;
  const statements = model.statements;

  return (
    <div className="grid auto-rows-auto grid-cols-[auto,minmax(0,1fr)] gap-2">
      <div className="relative col-span-full flex w-fit flex-row gap-1">
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
          bg={whileBlockColor}
          className="min-w-fit pr-8"
        >
          while
        </CodeBlock>
        <Expression list={children} />
      </div>
      <div
        className="bg-block col-span-1 -my-4 w-[15px]"
        style={
          {
            "--bg-light": whileBlockColor.light,
            "--bg-dark": whileBlockColor.dark,
          } as React.CSSProperties
        }
      >
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
      </div>
      <div className="relative min-h-[60px]">
        <StatementList statements={statements} />
      </div>
      <div className="col-span-full">
        <CodeBlock bg={whileBlockColor}></CodeBlock>
      </div>
    </div>
  );
};

export default WhileBlock;
