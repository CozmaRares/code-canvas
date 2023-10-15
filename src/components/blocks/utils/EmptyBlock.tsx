import { emptyBlockColor } from "@/lib/block-colors";
import CodeBlock from "@/components/blocks/utils/CodeBlock";

type Props = {
  topSlot?: boolean;
  leftSlot?: boolean;
  bottomSlot?: boolean;
  rightSlot?: boolean;
};

const EmptyCodeBlock = (props: Props) => (
  <CodeBlock
    bg={emptyBlockColor}
    {...props}
  />
);

export default EmptyCodeBlock;
