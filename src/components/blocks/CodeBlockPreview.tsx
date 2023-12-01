import { BlockOrientation } from "@/lib/code-block";
import { BlockColor } from "./utils/colors";
import { cn } from "@/lib/utils";
import { ComponentJSX } from "@/lib/helper-types";

export type CodeBlockPreviewProps = {
  text: string;
  bg: BlockColor;
  orientation: BlockOrientation;
};

const CodeBlockPreview: ComponentJSX<CodeBlockPreviewProps> = ({
  text,
  bg,
  orientation,
}) => {
  let top = false;
  let bottom = false;
  let left = false;

  if (orientation == "vertical") {
    top = true;
    bottom = true;
  } else left = true;

  return (
    <div
      className={cn(
        "relative grid h-full w-[150px] min-w-fit [&>*]:col-span-full [&>*]:row-span-full",
        bottom && "mb-3",
        left && "ml-3",
      )}
    >
      <div
        className="[&>*]:bg-block grid h-[60px] 
                    grid-cols-[0.75rem,1.5rem,minmax(0,1fr),0.75rem] 
                    grid-rows-[0.75rem,minmax(0,1fr),1.5rem,minmax(0,1fr),0.75rem]
                    overflow-hidden 
                    rounded-lg"
        style={
          {
            "--bg-light": bg.light,
            "--bg-dark": bg.dark,
          } as React.CSSProperties
        }
      >
        <div className="col-start-1 row-span-full" />
        {!top && <div className="col-start-2 row-start-1" />}
        <div className="col-start-2 row-span-full row-start-2" />
        <div className="col-start-3 row-span-full" />
        <div className="col-start-4 row-span-2 row-start-1" />
        <div className="col-start-4 row-span-2 row-start-4" />
        {bottom && <div className="absolute left-3 top-full h-3 w-6" />}
        {left && (
          <div className="absolute right-full top-1/2 h-6 w-3 -translate-y-1/2" />
        )}
      </div>
      <div className="z-[1] flex flex-row items-center gap-2 whitespace-nowrap p-4">
        {text}
      </div>
    </div>
  );
};

export default CodeBlockPreview;
