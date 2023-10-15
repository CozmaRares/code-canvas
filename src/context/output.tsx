import { createContext, useContext, useState } from "react";

type ContextType = {
  output: string[];
  addOutputText: (text: string) => void;
  resetOutput: () => void;
  displayOutput: boolean;
  setDisplayOuput: React.Dispatch<React.SetStateAction<boolean>>;
};

const OutputContext = createContext<ContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

const OutputContextProvider = ({ children }: Props) => {
  const [output, setOutput] = useState<string[]>([]);
  const [displayOutput, setDisplayOuput] = useState(true);

  const addOutputText = (text: string) => setOutput(prev => [...prev, text]);
  const resetOutput = () => setOutput([]);

  return (
    <OutputContext.Provider
      value={{
        output,
        addOutputText,
        resetOutput,
        displayOutput,
        setDisplayOuput,
      }}
    >
      {children}
    </OutputContext.Provider>
  );
};

export default OutputContextProvider;

export function useOutputContext() {
  const context = useContext(OutputContext);

  if (context == null)
    throw new Error(
      "useOutputContext must be used within an OutputContextProvider",
    );

  return context;
}
