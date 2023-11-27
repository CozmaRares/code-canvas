import { CodeBlockInfo, codeBlocks } from "./code-block";

type Props = {
  statements: CodeBlockInfo[];
};

const StatementList = ({ statements }: Props) => (
  <ul>
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

type StatementBlockProps = CodeBlockInfo;

const StatementBlock = ({ id, type }: StatementBlockProps) => {
  const CodeBlock = codeBlocks[type].block;
  return (
    <CodeBlock
      id={id}
      blockProps={{ topSlot: false, bottomSlot: false }}
    />
  );
};

export default StatementList;
