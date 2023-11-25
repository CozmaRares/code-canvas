import {
  CodeBlockInfo,
  GenericCodeBlockModelWithChildren,
  codeBlocks,
} from "./code-block";

type Props = {
  parent: GenericCodeBlockModelWithChildren<unknown>;
  list: CodeBlockInfo[];
};

const ChildrenBlockList = ({ parent, list }: Props) => (
  <ul className="contents">
    {list.map(({ id, type }, idx) => (
      <li key={id}>
        <ChildBlock
          id={id}
          type={type}
          lastChild={idx == parent.maxChildrenLength - 1}
        />
      </li>
    ))}
  </ul>
);

export default ChildrenBlockList;

type ChildBlockProps = { lastChild: boolean } & CodeBlockInfo;

const ChildBlock = ({ id, type, lastChild }: ChildBlockProps) => {
  const CodeBlock = codeBlocks[type].block;
  return (
    <CodeBlock
      id={id}
      blockProps={{ rightSlot: !lastChild }}
    />
  );
};
