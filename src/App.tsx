import ThemeSwitch from "@/components/ThemeSwitch";
import VariableAssignBlock from "./components/blocks/VariableAssignBlock";

const App = () => {
  return (
    <>
      <VariableAssignBlock x={0} y={0} />
      <VariableAssignBlock x={0} y={68} />
      <ThemeSwitch />
    </>
  );
};

export default App;
