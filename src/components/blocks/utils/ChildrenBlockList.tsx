import { CodeBlockInfo, codeBlocks } from "./code-block";

type Props = {
  list: CodeBlockInfo[];
};

const ChildrenBlockList = ({ list }: Props) => (
  <ul className="contents">
    {list.map(({ id, type }) => (
      <li key={id}>
        <ChildBlock
          id={id}
          type={type}
        />
      </li>
    ))}
  </ul>
);

export default ChildrenBlockList;

const ChildBlock = ({ id, type }: CodeBlockInfo) => {
  const CodeBlock = codeBlocks[type].block;
  return <CodeBlock id={id} />;
};
