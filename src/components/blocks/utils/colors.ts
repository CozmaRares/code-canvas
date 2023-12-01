export type BlockColor = {
  light: string;
  dark: string;
};

function makeColor(light: string, dark: string): Readonly<BlockColor> {
  return Object.freeze({ light, dark });
}

export const emptyBlockColor = makeColor("#0f172a33", "#334155f0");

export const variableAssignBlockColor = makeColor("#a5b4fc", "#6366f1");
export const ifBlockColor = makeColor("#c4b5fd", "#8b5cf6");
export const whileBlockColor = makeColor("#f0abfc", "#d946ef");
export const printBlockColor = makeColor("#f9a8d4", "#ec4899");

export const variableNameBlockColor = makeColor("#a3e635", "#4d7c0f");
export const operatorBlockColor = makeColor("#2dd4bf", "#0f766e");
export const numberBlockColor = makeColor("#60a5fa", "#1d4ed8");
