import { useOutputContext } from "@/context/output";
import { Cog } from "lucide-react";

const Console = () => {
  const { output, displayOutput } = useOutputContext();

  return (
    <div className="relative h-full w-[400px] rounded-lg border border-slate-800 bg-background p-4 font-mono dark:border-slate-50">
      <span className="absolute right-5 top-0 -translate-y-1/2 rounded-sm bg-slate-800 px-2 py-1.5 text-white dark:bg-slate-50 dark:text-black">
        Console
      </span>
      {displayOutput ? (
        <ul>
          {output.map((text, idx) => (
            <li key={idx}>{text}</li>
          ))}
        </ul>
      ) : (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.75] opacity-60">
          <div className="relative aspect-square w-[38px]">
            <div className="absolute right-0 top-0">
              <Cog className="animate-spin direction-reverse " />
            </div>
            <div className="absolute bottom-0 left-0 rotate-[15deg]">
              <Cog className="animate-spin" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Console;
