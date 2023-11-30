import { cn } from "@/lib/utils";
import { BlockColor } from "./colors";
import { ComponentJSX } from "@/lib/helper-types";

export type BaseCodeBlockProps = {
  bg?: BlockColor;
  children?: React.ReactNode;
  className?: string;
};

const CodeBlock: ComponentJSX<BaseCodeBlockProps> = ({
  bg,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-block flex w-fit min-w-[150px] flex-row items-center gap-2 whitespace-nowrap rounded-lg p-4",
        className,
      )}
      style={{
        ...(bg
          ? ({
              "--bg-light": bg.light,
              "--bg-dark": bg.dark,
            } as React.CSSProperties)
          : {}),
      }}
    >
      {children}
    </div>
  );
};

export default CodeBlock;
