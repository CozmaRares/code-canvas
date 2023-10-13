import CodeBlock, {
  BaseCodeBlockProps,
} from "@/components/blocks/utils/CodeBlock";
import { variableAssignBlockColor } from "@/lib/block-colors";

const VariableAssignBlockPreview = (props?: BaseCodeBlockProps) => (
  <CodeBlock
    bg={variableAssignBlockColor}
    topSlot
    bottomSlot
    {...props}
  >
    let variable
  </CodeBlock>
);

export default VariableAssignBlockPreview;
