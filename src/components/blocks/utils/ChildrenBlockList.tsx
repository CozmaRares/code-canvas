import { CodeBlockInfo, codeBlocks } from "./code-block";

type Props = {
  list: CodeBlockInfo[];
};

const ChildrenBlockList = ({ list }: Props) => (
  <ul className="contents">
    {list.map(({ id, type }, idx) => (
      <li key={id}>
        <ChildBlock
          id={id}
          type={type}
          last={idx == list.length - 1}
        />
      </li>
    ))}
  </ul>
);

export default ChildrenBlockList;

const ChildBlock = ({ id, type, last }: CodeBlockInfo & { last: boolean }) => {
  const CodeBlock = codeBlocks[type].block;
  return (
    <CodeBlock
      id={id}
      blockProps={{ rightSlot: !last }}
    />
  );
};
