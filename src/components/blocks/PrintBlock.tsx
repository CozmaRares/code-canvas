import { printBlockColor } from "@/lib/block-colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";
import {
  type CodeBlockProps,
  GenericCodeBlockModelWithChildren,
} from "@/components/blocks/utils/code-block";
import store from "@/lib/store";
import { variableNameBlockType } from "./VariableNameBlock";
import ChildrenBlockList from "./utils/ChildrenBlockList";
import DropArea from "../DropArea";

export const printBlockType = "print" as const;
export type PrintBlockProps = Record<string, unknown>;

type ChildrenTypes = typeof variableNameBlockType;

export class PrintBlockModel
  implements GenericCodeBlockModelWithChildren<PrintBlockProps>
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

const PrintBlock = ({ id, blockProps }: CodeBlockProps) => {
  const model = store.getModel(id) as PrintBlockModel;
  const children = model.children;

  return (
    <div className="flex flex-row">
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
        topSlot
        bottomSlot
        rightSlot
        {...blockProps}
      >
        print
      </CodeBlock>
      <ChildrenBlockList
        parent={model}
        list={children}
      />
    </div>
  );
};

export default PrintBlock;
