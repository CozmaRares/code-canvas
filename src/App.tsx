import ThemeSwitch from "@/components/ThemeSwitch";
import CodeBlock from "@/components/CodeBlock";

const App = () => {
  return (
    <>
      <CodeBlock x={0} y={0} />
      <CodeBlock x={0} y={68} />
      <ThemeSwitch />
    </>
  );
};

export default App;
