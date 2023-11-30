import { ifBlockColor } from "./utils/colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";
import {
  GenericCodeBlockModelWithStatements,
  CodeBlockInfoGeneric,
  VerticalBlockInfo,
  CodeBlockComponent,
} from "@/lib/code-block";
import store from "@/lib/store";
import { variableNameBlockType } from "./VariableNameBlock";
import StatementList from "./utils/StatementList";
import DropArea from "../DropArea";
import Expression from "./utils/Expression";

export const ifBlockType = "if" as const;
export type IfBlockProps = Record<string, unknown>;

type ChildrenTypes = typeof variableNameBlockType;

export class IfBlockModel
  implements GenericCodeBlockModelWithStatements<IfBlockProps>
{
  id: string;
  type = ifBlockType;
  props: IfBlockProps;
  childrenTypes = Object.freeze([
    variableNameBlockType,
  ] satisfies ChildrenTypes[]);
  children: Array<CodeBlockInfoGeneric<ChildrenTypes>> = [];
  maxChildrenLength = 1;
  statements: Array<VerticalBlockInfo> = [];

  constructor(id: string) {
    this.id = id;
    this.props = {};
  }
}

const IfBlock: CodeBlockComponent = ({ id }) => {
  const model = store.getModel(id) as IfBlockModel;
  const children = model.children;
  const statements = model.statements;

  return (
    <div className="grid auto-rows-auto grid-cols-[auto,minmax(0,1fr)] gap-2">
      <div className="relative col-span-full flex w-fit flex-row gap-1">
        <DropArea
          id={`${id}-right`}
          data={{
            type: ifBlockType,
            id: id,
            isCodeBlock: true,
            isRightDrop: true,
          }}
          className="bottom-0 right-0 top-0 w-4 rounded-r-lg"
        />
        <CodeBlock
          bg={ifBlockColor}
          className="min-w-fit pr-8"
        >
          if
        </CodeBlock>
        <Expression list={children} />
      </div>
      <div
        className="bg-block col-span-1 -my-4 w-[15px]"
        style={
          {
            "--bg-light": ifBlockColor.light,
            "--bg-dark": ifBlockColor.dark,
          } as React.CSSProperties
        }
      >
        <DropArea
          id={`${id}-inner`}
          data={{
            type: ifBlockType,
            id: id,
            isCodeBlock: true,
            isInnerDrop: true,
          }}
          className="inset-0 w-4 rounded-lg"
        />
      </div>
      <div className="relative min-h-[60px] w-full">
        <StatementList statements={statements} />
      </div>
      <div className="col-span-full">
        <CodeBlock bg={ifBlockColor}></CodeBlock>
      </div>
    </div>
  );
};

export default IfBlock;
