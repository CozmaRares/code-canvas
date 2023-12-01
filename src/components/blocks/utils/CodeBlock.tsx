import { cn } from "@/lib/utils";
import { BlockColor } from "./colors";
import { ComponentJSX } from "@/lib/helper-types";
import { X } from "lucide-react";
import store from "@/lib/store";

export type BaseCodeBlockProps = {
  id: string;
  bg?: BlockColor;
  children?: React.ReactNode;
  className?: string;
};

const CodeBlock: ComponentJSX<BaseCodeBlockProps> = ({
  id,
  bg,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-block group relative flex w-fit min-w-[150px] flex-row items-center gap-2 whitespace-nowrap rounded-lg px-4 py-5",
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
      <button
        title="Delete"
        className="absolute right-1 top-0.5 scale-75 text-foreground/0 opacity-60 transition-[opacity,color] hover:opacity-100 focus:text-foreground focus:opacity-100 group-hover:text-foreground"
        onClick={() => store.deleteBlock(id, true)}
      >
        <X />
      </button>
    </div>
  );
};

export default CodeBlock;
