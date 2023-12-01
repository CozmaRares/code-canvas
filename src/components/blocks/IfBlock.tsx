import { ifBlockColor } from "./utils/colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";
import { CodeBlockComponent } from "@/lib/code-block";
import store from "@/lib/store";
import StatementList from "./utils/StatementList";
import DropArea from "../DropArea";
import Expression from "./utils/Expression";
import { IfBlockModel, ifBlockType } from "@/lib/models/if-model";

const IfBlock: CodeBlockComponent = ({ id }) => {
  const model = store.getModel(id) as IfBlockModel;
  const expressionList = model.expressionList;
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
          className="-right-2 bottom-0 top-0 w-2 rounded-lg"
        />
        <CodeBlock
          id={id}
          bg={ifBlockColor}
          className="min-w-fit pr-8"
        >
          if
        </CodeBlock>
        <Expression list={expressionList} />
      </div>
      <div
        className="bg-block col-span-1 -my-4 w-[15px]"
        style={
          {
            "--bg-light": ifBlockColor.light,
            "--bg-dark": ifBlockColor.dark,
          } as React.CSSProperties
        }
      />
      <div className="relative min-h-[60px] w-full">
        <DropArea
          id={`${id}-inner`}
          data={{
            type: ifBlockType,
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
            "--bg-light": ifBlockColor.light,
            "--bg-dark": ifBlockColor.dark,
          } as React.CSSProperties
        }
      />
    </div>
  );
};

export default IfBlock;
