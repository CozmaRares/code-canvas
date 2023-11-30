import { VariableAssignBlockModel } from "@/components/blocks/VariableAssignBlock";
import { NumberBlockModel } from "@/components/blocks/NumberBlock";
import { VariableNameBlockModel } from "@/components/blocks/VariableNameBlock";
import { OperatorBlockModel } from "@/components/blocks/OperatorBlock";
import store from "@/lib/store";

export default class PythonConverter {
  static program(): string {
    return store.blocks
      .map(({ type, id }) => {
        switch (type) {
          case "variable assign":
            return PythonConverter.assignment(id);
          case "if":
            return PythonConverter.if(id);
          case "while":
            return PythonConverter.while(id);
          case "print":
            return PythonConverter.print(id);
          default:
            throw new Error(
              "UNREACHABLE CODE IN PythonConverter.toPython.program()",
            );
        }
      })
      .join("\n");
  }

  static number(model: NumberBlockModel): string {
    return model.props.number;
  }

  static variableName(model: VariableNameBlockModel): string {
    return model.props.variable;
  }

  static operator(model: OperatorBlockModel): string {
    return model.props.operator;
  }

  static assignment(id: string): string {
    const model = store.getModel(id) as VariableAssignBlockModel;
    const output = [`${model.props.variable} =`];

    model.children.forEach(child => {
      const childModel = store.getModel(child.id);

      switch (childModel.type) {
        case "number":
          output.push(PythonConverter.number(childModel));
          break;
        case "operator":
          output.push(PythonConverter.operator(childModel));
          break;
        case "variable name":
          output.push(PythonConverter.variableName(childModel));
          break;
      }
    });

    return output.join(" ");
  }

  // TODO:
  static if(id: string): string {
    return "if";
  }

  static while(id: string): string {
    return "while";
  }

  static print(id: string): string {
    return "print";
  }
}
