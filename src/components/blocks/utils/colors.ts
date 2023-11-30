export type BlockColor = {
  light: string;
  dark: string;
};

// TODO: altele
function makeColor(light: string, dark: string): Readonly<BlockColor> {
  return Object.freeze({ light, dark });
}

export const emptyBlockColor = makeColor("#0f172a33", "#334155f0");

export const variableAssignBlockColor = makeColor("#ef4444", "#6366f1");
export const ifBlockColor = makeColor("#f97316", "#8b5cf6");
export const whileBlockColor = makeColor("#f59e0b", "#a855f7");
export const printBlockColor = makeColor("#eab308", "#d946ef");

export const variableNameBlockColor = makeColor("#818cf8", "#15803d");
export const numberBlockColor = makeColor("#a78bfa", "#0f766e");
export const operatorBlockColor = makeColor("#c084fc", "#075985");
