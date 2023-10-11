import { anchorBlockColor } from "@/lib/block-colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";

type Props = {
  text: string;
};

const AnchorBlock = ({ text }: Props) => (
  <CodeBlock
    bg={anchorBlockColor}
    bottomSlot
  >
    {text}
  </CodeBlock>
);

export default AnchorBlock;
