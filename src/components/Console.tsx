const Console = () => (
  <div className="relative h-full w-[400px] rounded-lg border border-slate-800 bg-background p-4 dark:border-slate-50">
    <span className="absolute right-5 top-0 -translate-y-1/2 rounded-sm bg-slate-800 px-2 py-1.5 text-white dark:bg-slate-50 dark:text-black">
      Console
    </span>
    <ul>
      <li> {"> input"}</li>
    </ul>
    <ul>
      <li> {"< output"}</li>
    </ul>
  </div>
);

export default Console;
