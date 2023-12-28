import { VerticalBlockInfo, codeBlocks } from "@/lib/code-block";
import { ComponentJSX } from "@/lib/utils";

type Props = {
  statements: VerticalBlockInfo[];
};

const StatementList: ComponentJSX<Props> = ({ statements }) => (
  <ul className="space-y-2">
    {statements.map(({ id, type }) => (
      <li key={id}>
        <StatementBlock
          id={id}
          type={type}
        />
      </li>
    ))}
  </ul>
);

export default StatementList;

type StatementBlockProps = VerticalBlockInfo;

const StatementBlock: ComponentJSX<StatementBlockProps> = ({ id, type }) => {
  const CodeBlock = codeBlocks[type].block;
  return <CodeBlock id={id} />;
};
