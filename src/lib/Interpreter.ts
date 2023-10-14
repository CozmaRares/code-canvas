import { VariableAssignBlockProps } from "@/components/blocks/VariableAssignBlock";
import store from "./store";

export default class Interpreter {
  private addConsoleText: (text: string) => void = () => {};

  private variables: Map<string, string | number> = new Map();

  start(
    addConsoleText: (text: string) => void,
    // getInput: (identifier: string) => void,
  ) {
    this.addConsoleText = addConsoleText;
    this.variables = new Map();

    store.blocks.forEach(block => {
      switch (block.type) {
        case "variable assign":
          this.handleVariableAssign(block.props);
      }
    });
  }

  private handleVariableAssign(props: VariableAssignBlockProps) {
    const variable = props.variable;
    // FIXME: assumes value can only be a number
    const value: string = props.value;

    this.variables.set(variable, parseInt(value));
    // TODO: Python converter output
    this.addConsoleText(`> ${variable} = ${value}`);
  }
}
