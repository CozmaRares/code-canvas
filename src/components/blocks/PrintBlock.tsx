import { printBlockColor } from "./utils/colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";
import {
  CodeBlockComponent,
  GenericCodeBlockModelWithExpression,
} from "@/lib/code-block";
import store from "@/lib/store";
import { variableNameBlockType } from "./VariableNameBlock";
import DropArea from "../DropArea";
import Expression from "./utils/Expression";

export const printBlockType = "print" as const;
export type PrintBlockProps = Record<string, unknown>;

type ChildrenTypes = typeof variableNameBlockType;

export class PrintBlockModel
  implements GenericCodeBlockModelWithExpression<PrintBlockProps>
{
  id: string;
  type = printBlockType;
  props: PrintBlockProps;
  childrenTypes = Object.freeze([
    variableNameBlockType,
  ] satisfies ChildrenTypes[]);
  children: Array<{
    id: string;
    type: ChildrenTypes;
  }> = [];
  maxChildrenLength = 1;

  constructor(id: string) {
    this.id = id;
    this.props = {};
  }
}

const PrintBlock: CodeBlockComponent = ({ id }) => {
  const model = store.getModel(id) as PrintBlockModel;
  const children = model.children;

  return (
    <div className="relative flex w-fit flex-row gap-1">
      <DropArea
        id={`${id}-right`}
        data={{
          type: printBlockType,
          id: id,
          isCodeBlock: true,
          isRightDrop: true,
        }}
        className="bottom-0 right-0 top-0 w-4 rounded-r-lg"
      />
      <CodeBlock
        bg={printBlockColor}
        className="min-w-fit pr-8"
      >
        print
      </CodeBlock>
      <Expression list={children} />
    </div>
  );
};

export default PrintBlock;
