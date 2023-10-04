import { useState } from "react";
import CodeBlock from "./CodeBlock";
import TypeLabel from "./TypeLabel";
import { twMerge } from "tailwind-merge";

type Props = {
    x: number;
    y: number;
    bg?: string;
};

const DEFAULT_BG = "bg-pink-300 dark:bg-pink-600";

const VariableAssignBlock = ({ x, y, bg }: Props) => {
    const [variableName, setVariableName] = useState("");
    const [value, setValue] = useState("");

    bg = twMerge(DEFAULT_BG, bg);

    return (
        <CodeBlock
            x={x}
            y={y}
            bg={bg}
        >
            define variable
            <TypeLabel
                text={variableName}
                setText={setVariableName}
                placeholder="variable"
            />
            with value
            <TypeLabel
                text={value}
                setText={setValue}
                placeholder="value"
            />
        </CodeBlock>
    );
};

export default VariableAssignBlock;
