import { useState } from "react";
import CodeBlock from "./utils/CodeBlock";
import TypeLabel from "./utils/TypeLabel";
import { variableAssignBlockColor } from "@/lib/block-colors";

const VariableAssignBlock = () => {
  const [variableName, setVariableName] = useState("");
  const [value, setValue] = useState("");

  return (
    <CodeBlock bg={variableAssignBlockColor}>
      let variable
      <TypeLabel
        text={variableName}
        setText={setVariableName}
        placeholder="variable"
      />
      be
      <TypeLabel
        text={value}
        setText={setValue}
        placeholder="value"
      />
    </CodeBlock>
  );
};

export default VariableAssignBlock;
