import CodeBlock from "@/components/blocks/utils/CodeBlock";
import { variableAssignBlockColor } from "@/lib/block-colors";

const VariableAssignBlock = () => (
  <CodeBlock
    bg={variableAssignBlockColor}
    topSlot
    bottomSlot
  >
    let variable
  </CodeBlock>
);

export default VariableAssignBlock;
