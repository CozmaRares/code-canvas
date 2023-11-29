import React, { createContext, useContext, useState } from "react";

export type ConsoleText = { type: "in" | "out" | "err"; text: string };

type ContextType = {
  consoleText: ConsoleText[];

  addConsoleText: (consoleText: ConsoleText) => void;
  clearConsole: () => void;

  displayText: boolean;
  setDisplayText: React.Dispatch<React.SetStateAction<boolean>>;

  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConsoleContext = createContext<ContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

const ConsoleContextProvider = ({ children }: Props) => {
  const [consoleText, setConsoleText] = useState<
    Array<{ type: "in" | "out" | "err"; text: string }>
  >([]);
  const [displayText, setDisplayText] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const addConsoleText = (consoleText: ConsoleText) =>
    setConsoleText(prev => [...prev, consoleText]);
  const clearConsole = () => setConsoleText([]);

  return (
    <ConsoleContext.Provider
      value={{
        consoleText,
        addConsoleText,
        clearConsole,

        displayText,
        setDisplayText,

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
