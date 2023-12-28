import { HorizontalBlockInfo, codeBlocks } from "@/lib/code-block";
import { ComponentJSX } from "@/lib/utils";

type Props = {
  list: HorizontalBlockInfo[];
};

const Expression: ComponentJSX<Props> = ({ list }) => (
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

export default Expression;

type ChildBlockProps = HorizontalBlockInfo;

const ChildBlock: ComponentJSX<ChildBlockProps> = ({ id, type }) => {
  const CodeBlock = codeBlocks[type].block;
  return <CodeBlock id={id} />;
};
