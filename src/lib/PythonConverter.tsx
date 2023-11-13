import { VariableAssignBlockModel } from "@/components/blocks/VariableAssignBlock";
import { NumberBlockModel } from "@/components/blocks/NumberBlock";
import { VariableNameBlockModel } from "@/components/blocks/VariableNameBlock";
import { OperatorBlockModel } from "@/components/blocks/OperatorBlock";
import store from "@/lib/store";

export default class PythonConverter {
  // TODO:
  static fromPython = class {};

  static toPython = class {
    static program() {
      return store.blocks
        .map(model => {
          switch (model.type) {
            case "variable assign":
              return PythonConverter.toPython.assignment(model);
            default:
              throw new Error(
                "UNREACHABLE CODE IN PythonConverter.toPython.program()",
              );
          }
        })
        .join("\n");
    }

    static number(model: NumberBlockModel) {
      return model.props.number;
    }

    static variableName(model: VariableNameBlockModel) {
      return model.props.variable;
    }

    static operator(model: OperatorBlockModel) {
      return model.props.operator;
    }

    // FIXME: assumes assignment is syntactically correct
    // mabye add a flag to disable checking
    static assignment(model: VariableAssignBlockModel) {
      const output = [`${model.props.variable}=`];

      model.children.forEach(child => {
        const childModel = store.getModel(child.id);

        switch (childModel.type) {
          case "number":
            output.push(PythonConverter.toPython.number(childModel));
            break;
          case "operator":
            output.push(PythonConverter.toPython.operator(childModel));
            break;
          case "variable name":
            output.push(PythonConverter.toPython.variableName(childModel));
            break;
        }
      });

      return output.join("");
    }
  };
}
