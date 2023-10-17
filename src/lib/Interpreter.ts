import { VariableAssignBlockModel } from "@/components/blocks/VariableAssignBlock";
import store from "./store";
import { NumberBlockModel } from "@/components/blocks/NumberBlock";

// class Parser{}

export default class Interpreter {
  private addConsoleText: (text: string) => void = () => {};

  private variables: Map<string, string | number> = new Map();

  async start(
    addConsoleText: (text: string) => void,
    // getInput: (identifier: string) => void,
  ) {
    this.addConsoleText = addConsoleText;
    this.variables = new Map();

    store.blocks.forEach(block => {
      switch (block.type) {
        case "variable assign":
          this.handleVariableAssign(block);
      }
    });

    console.log(this.variables);
  }

  private handleVariableAssign(model: VariableAssignBlockModel) {
    const variable = model.props.variable;
    // FIXME: integrate parser
    const number = parseInt(
      (store.getModel(model.children[0].id) as NumberBlockModel).props.number,
    );

    this.variables.set(variable, number);
    // TODO: Python converter output
    this.addConsoleText(`> ${variable} = ${number}`);
  }
}
