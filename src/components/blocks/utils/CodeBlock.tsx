import type { BlockColor } from "@/lib/block-colors";
import { cn } from "@/lib/utils";

export type BaseCodeBlockProps = {
  bg?: BlockColor;
  children?: React.ReactNode;
  topSlot?: boolean;
  leftSlot?: boolean;
  bottomSlot?: boolean;
  rightSlot?: boolean;
  isPreview?: boolean;
  minHeight?: number;
};

const CodeBlock = ({
  bg,
  children,
  topSlot,
  leftSlot,
  bottomSlot,
  rightSlot,
  isPreview,
  minHeight,
}: BaseCodeBlockProps) => {
  return (
    <div
      className={cn("relative isolate w-fit min-w-[150px] rounded-lg", {
        "mb-3": isPreview && bottomSlot,
        "ml-3": isPreview && leftSlot,
      })}
    >
      <div className="grid h-full [&>*]:col-span-full [&>*]:row-span-full">
        <div
          className="[&>*]:bg-block grid min-h-[60px] 
                    grid-cols-[0.75rem,1.5rem,minmax(0,1fr),0.75rem] 
                    grid-rows-[0.75rem,minmax(0,1fr),1.5rem,minmax(0,1fr),0.75rem]
                    overflow-hidden 
                    rounded-lg"
          style={{
            ...(bg
              ? ({
                  "--bg-light": bg.light,
                  "--bg-dark": bg.dark,
                } as React.CSSProperties)
              : {}),
            ...(minHeight ? { minHeight:`${minHeight}px` } : {}),
          }}
        >
          <div className="col-start-1 row-span-full" />
          {!topSlot && <div className="col-start-2 row-start-1" />}
          <div className="col-start-2 row-span-full row-start-2" />
          <div className="col-start-3 row-span-full" />
          <div className="col-start-4 row-span-2 row-start-1" />
          {!rightSlot && <div className="col-start-4 row-start-3" />}
          <div className="col-start-4 row-span-2 row-start-4" />
          {bottomSlot && <div className="absolute left-3 top-full h-3 w-6" />}
          {leftSlot && (
            <div className="absolute right-full top-1/2 h-6 w-3 -translate-y-1/2" />
          )}
        </div>
        <div
          className={
            "z-[1] flex flex-row items-center gap-2 whitespace-nowrap p-4" +
            (rightSlot ? " mr-3" : "")
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
