import { whileBlockColor } from "./utils/colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";
import { CodeBlockComponent } from "@/lib/code-block";
import store from "@/lib/store";
import StatementList from "./utils/StatementList";
import DropArea from "../DropArea";
import Expression from "./utils/Expression";
import { WhileBlockModel, whileBlockType } from "@/lib/models/while-model";

const WhileBlock: CodeBlockComponent = ({ id }) => {
  const model = store.getModel(id) as WhileBlockModel;
  const expressionList = model.expressionList;
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
          className="-right-2 bottom-0 top-0 w-2 rounded-lg"
        />
        <CodeBlock
          id={id}
          bg={whileBlockColor}
          className="min-w-fit pr-8"
        >
          while
        </CodeBlock>
        <Expression list={expressionList} />
      </div>
      <div
        className="bg-block col-span-1 -my-4 w-[15px]"
        style={
          {
            "--bg-light": whileBlockColor.light,
            "--bg-dark": whileBlockColor.dark,
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
          className="-left-2 bottom-0 top-0 w-2 rounded-lg"
        />
        <StatementList statements={statements} />
      </div>
      <div
        className="bg-block col-span-full h-[32px] w-[150px] rounded-lg"
        style={
          {
            "--bg-light": whileBlockColor.light,
            "--bg-dark": whileBlockColor.dark,
          } as React.CSSProperties
        }
      />
    </div>
  );
};

export default WhileBlock;
