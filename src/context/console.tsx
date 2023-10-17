import React, { createContext, useContext, useState } from "react";

type ContextType = {
  output: string[];
  addOutputText: (text: string) => void;
  resetOutput: () => void;

  displayOutput: boolean;
  setDisplayOuput: React.Dispatch<React.SetStateAction<boolean>>;

  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConsoleContext = createContext<ContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

const ConsoleContextProvider = ({ children }: Props) => {
  const [output, setOutput] = useState<string[]>([]);
  const [displayOutput, setDisplayOuput] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const addOutputText = (text: string) => setOutput(prev => [...prev, text]);
  const resetOutput = () => setOutput([]);

  return (
    <ConsoleContext.Provider
      value={{
        output,
        addOutputText,
        resetOutput,

        displayOutput,
        setDisplayOuput,

        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </ConsoleContext.Provider>
  );
};

export default ConsoleContextProvider;

export function useConsoleContext() {
  const context = useContext(ConsoleContext);

  if (context == null)
    throw new Error(
      "useConsoleContext must be used within an ConsoleContextProvider",
    );

  return context;
}
