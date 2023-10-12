import CodeBlock, {
  BaseCodeBlockProps,
} from "@/components/blocks/utils/CodeBlock";
import { variableAssignBlockColor } from "@/lib/block-colors";

const VariableAssignBlock = (props: BaseCodeBlockProps) => (
  <CodeBlock
    bg={variableAssignBlockColor}
    topSlot
    bottomSlot
    {...props}
  >
    let variable
  </CodeBlock>
);

export default VariableAssignBlock;
