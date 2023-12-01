import { printBlockColor } from "./utils/colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";
import { CodeBlockComponent } from "@/lib/code-block";
import store from "@/lib/store";
import DropArea from "../DropArea";
import Expression from "./utils/Expression";
import { PrintBlockModel, printBlockType } from "@/lib/models/print-model";

const PrintBlock: CodeBlockComponent = ({ id }) => {
  const model = store.getModel(id) as PrintBlockModel;
  const expressionList = model.expressionList;

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
        className="-right-2 bottom-0 top-0 w-2 rounded-lg"
      />
      <CodeBlock
        id={id}
        bg={printBlockColor}
        className="min-w-fit pr-8"
      >
        print
      </CodeBlock>
      <Expression list={expressionList} />
    </div>
  );
};

export default PrintBlock;
