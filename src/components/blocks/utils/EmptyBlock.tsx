import { emptyBlockColor } from "@/lib/block-colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";

const EmptyCodeBlock = () => (
  <CodeBlock
    bg={emptyBlockColor}
    topSlot
    bottomSlot
  />
);

export default EmptyCodeBlock;
