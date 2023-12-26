// NOTE: defined the operators in a separate file to avoid circular imports
export const SUPPORTED_OPERATORS = Object.freeze({
  "+": (left: number, right: number) => left + right,
  "-": (left: number, right: number) => left - right,
  "*": (left: number, right: number) => left * right,
  "/": (left: number, right: number) => left / right,
  "//": (left: number, right: number) => Math.floor(left / right),
  "%": (left: number, right: number) => left % right,
  "^": (left: number, right: number) => left ** right,
  "=": (left: number, right: number) => Number(left == right),
  "<": (left: number, right: number) => Number(left < right),
  ">": (left: number, right: number) => Number(left > right),
  "<=": (left: number, right: number) => Number(left <= right),
  ">=": (left: number, right: number) => Number(left >= right),
  "!=": (left: number, right: number) => Number(left >= right),
} as const);
