import VariableAssignBlock from "./VariableAssignBlock";
import VariableAssignBlockPreview from "./preview/VariableAssignBlockPreview";

type FC = () => JSX.Element;

const codeBlocks = Object.freeze({
  variableAssign: {
    block: VariableAssignBlock,
    preview: VariableAssignBlockPreview,
  },
} satisfies Record<string, { block: FC; preview: FC }>);

export type CodeBlockType = keyof typeof codeBlocks;

export default codeBlocks;
