import { VariableAssignBlockModel } from "@/components/blocks/VariableAssignBlock";
import store from "./store";
import { NumberBlockModel } from "@/components/blocks/NumberBlock";
import { VariableNameBlockModel } from "@/components/blocks/VariableNameBlock";
import { SUPPORTED_OPERATORS } from "@/components/blocks/utils/code-block";

type VariableMap = Map<string, number>;

function parseAssignment(
  model: VariableAssignBlockModel,
  variables: VariableMap,
) {
  if (model.children.length < 1)
    return { error: "Parsing error: Could not compute value." };

  const getNumber = (model: NumberBlockModel) => {
    const value = parseInt(model.props.number);
    return isNaN(value)
      ? { error: "Parsing error: Value is not a number." }
      : { value };
  };

  const getVariableValue = (model: VariableNameBlockModel) => {
    const value = variables.get(model.props.variable);
    return value === undefined
      ? {
          error: `Parsing error: Variable '${model.props.variable}' does not exist.`,
        }
      : { value };
  };

  const getValue = (model: (typeof children)[number]) =>
    model.type == "number"
      ? getNumber(model)
      : model.type == "variable name"
      ? getVariableValue(model as VariableNameBlockModel)
      : {
          error:
            "Parsing error: Assignment must begin with a number of variable.",
        };

  const children = model.children.map(child => store.getModel(child.id));
  const firstChild = children.shift()!;
  let result = getValue(firstChild);

  if (result.error !== undefined) return { error: result.error };

  let value = result.value;
  let operator: string | null = null;

  for (const child of children) {
    if (operator == null)
      if (child.type != "operator")
        return { error: "Pasring error: Was expecting an operator." };
      else {
        operator = child.props.operator;

        if (
          !(SUPPORTED_OPERATORS.mathematical as readonly string[]).includes(
            operator,
          )
        )
          return {
            error: `Parsing error: Operator '${operator}' is not mathematical.`,
          };

        continue;
      }
    else {
      result = getValue(child);
      if (result.error !== undefined) return { error: result.error };

      const rightValue = result.value;

      switch (operator) {
        case "+":
          value += rightValue;
          break;
        case "-":
          value -= rightValue;
          break;
        case "*":
          value *= rightValue;
          break;
        case "/":
          value = value / rightValue;
          break;
        case "^":
          value = value ** rightValue;
          break;
      }

      operator = null;
    }
  }

  return { value };
}

export default class Interpreter {
  private addConsoleText: (text: string) => void = () => {};
  private variables: VariableMap = new Map();

  async start(
    addConsoleText: (text: string) => void,
    clearConsole: () => void,
    // getInput: (identifier: string) => void,
  ) {
    this.addConsoleText = addConsoleText;
    this.variables = new Map();

    for (const block of store.blocks) {
      let result: string | false;
      switch (block.type) {
        case "variable assign":
          result = this.handleVariableAssign(block);
          break;
        default:
          throw new Error("Interpreter error: unreachable");
      }

      if (result !== false) {
        clearConsole();
        addConsoleText(result);
        return;
      }
    }
  }

  private handleVariableAssign(
    model: VariableAssignBlockModel,
  ): string | false {
    const variable = model.props.variable;

    if (variable.length < 1)
      return "Parsing error: Cannot assign anything to an empty variable.";

    const { error, value } = parseAssignment(model, this.variables);
    if (error !== undefined) return error;

    this.variables.set(variable, value);

    // TODO: Python converter output
    this.addConsoleText(`> ${variable} = ${value}`);

    return false;
  }
}
