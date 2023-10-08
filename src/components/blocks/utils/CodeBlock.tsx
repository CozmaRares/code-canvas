import { Color } from "@/lib/block-colors";
import { cn } from "@/lib/utils";

type Props = {
  bg?: Color;
  hideTopSlot?: boolean;
  children?: React.ReactNode;
};

const CodeBlock = ({ bg, hideTopSlot, children }: Props) => {
  return (
    <div className="isolate  w-fit min-w-[150px] rounded-lg">
      <div className="grid [&>*]:col-span-full [&>*]:row-span-full">
        <div
          className="[&>*]:bg-block flex min-h-[60px] flex-row"
          style={
            bg &&
            ({
              "--bg-light": bg.light,
              "--bg-dark": bg.dark,
            } as React.CSSProperties)
          }
        >
          <div className="h-full w-[1px] rounded-l-lg pl-3" />
          <div
            className={cn("border-r-full relative h-full w-6", {
              "h-[calc(100%+0.75rem)]": hideTopSlot,
              "mt-3 before:absolute before:-top-3 before:z-[1] before:inline-block before:h-3 before:w-6 before:bg-transparent":
                !hideTopSlot,
            })}
          />
          <div className="h-full flex-grow rounded-r-lg" />
        </div>
        <div className="z-[1] flex flex-row items-center gap-2 whitespace-nowrap p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
