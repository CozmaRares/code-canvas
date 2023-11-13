export type BlockColor = {
  light: string;
  dark: string;
};

function makeColor(light: string, dark: string): Readonly<BlockColor> {
  return Object.freeze({ light, dark });
}

// TODO: proper color palette
export const anchorBlockColor = makeColor("#fb7185", "#991b1b");
export const variableAssignBlockColor = makeColor("#f9a8d4", "#5b21b6");
export const emptyBlockColor = makeColor("#0f172a33", "#334155f0");
export const valueBlockColor = makeColor("#22d3ee", "#1e40af");
