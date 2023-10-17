import { useConsoleContext } from "@/context/console";
import { cn } from "@/lib/utils";
import { Cog } from "lucide-react";

const Console = () => {
  const { output, displayOutput, isOpen } = useConsoleContext();

  return (
    <div
      className={cn(
        "relative h-full w-[400px] origin-top-right scale-0 rounded-lg border border-slate-800 bg-background p-4 font-mono transition-transform duration-300 dark:border-slate-50",
        isOpen && "scale-100",
      )}
    >
      <span className="absolute right-5 top-0 -translate-y-1/2 rounded-sm bg-slate-800 px-2 py-1.5 text-white dark:bg-slate-50 dark:text-black">
        Console
      </span>
      {displayOutput ? (
        <ul className="grid grid-cols-[auto,minmax(0,1fr)] items-center">
          {output.map((text, idx) => (
            <li
              key={idx}
              className="contents"
            >
              <Row
                line={idx + 1}
                text={text}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative mx-auto mb-6 aspect-square w-[38px] scale-[1.75] opacity-60">
            <div className="absolute right-0 top-0">
              <Cog className="animate-spin duration-1000 direction-reverse" />
            </div>
            <div className="absolute bottom-0 left-0 rotate-[15deg]">
              <Cog className="animate-spin duration-1000" />
            </div>
          </div>
          <p className="text-2xl">
            Loading
            <span className="inline-block animate-bounce">.</span>
            <span className="inline-block animate-bounce delay-100">.</span>
            <span className="inline-block animate-bounce delay-200">.</span>
          </p>
        </div>
      )}
    </div>
  );
};

type RowProps = {
  line: number;
  text: string;
};

const Row = ({ line, text }: RowProps) => (
  <>
    <span className="mr-4 border-r border-black py-1 pr-2 opacity-60 dark:border-white">
      {line}
    </span>
    <span>{text}</span>
  </>
);

export default Console;
