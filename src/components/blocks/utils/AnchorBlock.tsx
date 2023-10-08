import { anchorBlockColor } from "@/lib/block-colors";
import CodeBlock from "./CodeBlock";

type Props = {
  text: string;
};

const StartBlock = ({ text }: Props) => (
  <CodeBlock
    bg={anchorBlockColor}
    hideTopSlot
  >
    {text}
  </CodeBlock>
);

export default StartBlock;
