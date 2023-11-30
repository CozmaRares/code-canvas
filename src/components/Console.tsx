import { useConsoleContext } from "@/context/console";
import { ComponentJSX } from "@/lib/helper-types";
import { cn } from "@/lib/utils";
import { Cog } from "lucide-react";

const Console: ComponentJSX<unknown> = () => {
  const { consoleText, displayText, isOpen } = useConsoleContext();

  let inRows = 0;

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
      {displayText ? (
        consoleText.length > 0 ? (
          <ul className="grid max-h-full grid-cols-[auto,auto,minmax(0,1fr)] items-center overflow-auto pt-3 font-mono">
            {consoleText.map(({ type, text }, idx) => (
              <li
                key={idx}
                className="contents"
              >
                <Row
                  line={type == "in" ? ++inRows : 0}
                  type={type}
                  text={text}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-2 text-lg">No output.</p>
        )
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
  type: "in" | "out" | "err";
  text: string;
};

const Row: ComponentJSX<RowProps> = ({ line, type, text }) => (
  <div className={cn("contents", type == "err" && "font-bold text-red-600")}>
    {type != "err" && (
      <>
        {type == "in" ? (
          <>
            <span className="mr-3 border-r border-black py-1 pr-2 opacity-60 dark:border-white">
              {line}
            </span>
            <span className="mr-3 font-bold text-sky-400">{">"}</span>
          </>
        ) : (
          <>
            <span
              aria-hidden
              className="pointer-events-none mr-3 border-r border-black py-1 pr-2 opacity-60 dark:border-white"
            >
              <span className="opacity-0">{line}</span>
            </span>
            <span className="mr-3 font-bold text-indigo-600 dark:text-purple-400">
              {"<"}
            </span>
          </>
        )}
      </>
    )}
    <span>{text}</span>
  </div>
);

export default Console;
