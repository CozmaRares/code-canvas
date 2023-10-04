import { useState } from "react";
import TypeLabel from "./TypeLabel";

type Props = {
    x: number;
    y: number;
};

const CodeBlock = ({ x, y }: Props) => {
    const [variableName, setVariableName] = useState("");
    const [value, setValue] = useState("");

    return (
        <div
            className="absolute rounded-lg bg-pink-300"
            style={{ top: `${y}px`, left: `${x}px` }}
        >
            <div className="relative flex flex-row items-center gap-2 whitespace-nowrap p-4">
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
                <div className="absolute top-0 z-[1] aspect-square w-6 -translate-y-1/2 rounded-full bg-background" />
                <div className="absolute top-full z-[2] aspect-square w-6 -translate-y-1/2 rounded-full bg-pink-300" />
                <div />
            </div>
        </div>
    );
};

export default CodeBlock;
