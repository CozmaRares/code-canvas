import { emptyBlockColor } from "./colors";
import CodeBlock from "./CodeBlock";
import { ComponentJSX } from "@/lib/utils";

const EmptyCodeBlock: ComponentJSX<unknown> = () => (
  <CodeBlock
    id=""
    bg={emptyBlockColor}
    className="h-[60px]"
  ></CodeBlock>
);

export default EmptyCodeBlock;
