import VariableAssignBlock from "./VariableAssignBlock";
import VariableAssignBlockPreview from "./preview/VariableAssignBlockPreview";

type FC = () => JSX.Element;

const blocks = Object.freeze({
  variableAssign: {
    block: VariableAssignBlock,
    preview: VariableAssignBlockPreview,
  },
} satisfies Record<string, { block: FC; preview: FC }>);

export type CodeBlockType = keyof typeof blocks;

export default blocks;
