import { Color } from "@/lib/block-colors";

type Props = {
  bg?: Color;
  children?: React.ReactNode;
  topSlot?: boolean;
  leftSlot?: boolean;
  bottomSlot?: boolean;
  rightSlot?: boolean;
};

const CodeBlock = ({
  bg,
  children,
  topSlot,
  leftSlot,
  bottomSlot,
  rightSlot,
}: Props) => {
  return (
    <div className="relative isolate w-fit min-w-[150px] rounded-lg">
      <div className="grid [&>*]:col-span-full [&>*]:row-span-full">
        <div
          className="[&>*]:bg-block grid min-h-[60px] 
                    grid-cols-[0.75rem,1.5rem,minmax(0,1fr),0.75rem] 
                    grid-rows-[0.75rem,minmax(0,1fr),1.5rem,minmax(0,1fr),0.75rem]
                    overflow-hidden 
                    rounded-lg"
          style={
            bg &&
            ({
              "--bg-light": bg.light,
              "--bg-dark": bg.dark,
            } as React.CSSProperties)
          }
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
        <div className="z-[1] flex flex-row items-center gap-2 whitespace-nowrap p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
