import { ComponentJSX } from "@/lib/helper-types";
import { emptyBlockColor } from "./colors";
import CodeBlock from "./CodeBlock";

const EmptyCodeBlock: ComponentJSX<unknown> = () => (
  <CodeBlock
    id=""
    bg={emptyBlockColor}
    className="h-[60px]"
  ></CodeBlock>
);

export default EmptyCodeBlock;
