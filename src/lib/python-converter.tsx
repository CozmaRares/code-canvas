import store from "@/lib/store";
import { NumberBlockModel, numberBlockType } from "./models/number-model";
import {
  VariableNameBlockModel,
  variableNameBlockType,
} from "./models/variable-name-model";
import { OperatorBlockModel, operatorBlockType } from "./models/operator-model";
import {
  VariableAssignBlockModel,
  variableAssignBlockType,
} from "./models/variable-assignment-model";
import { WhileBlockModel, whileBlockType } from "./models/while-model";
import { IfBlockModel, ifBlockType } from "./models/if-model";
import { PrintBlockModel, printBlockType } from "./models/print-model";
import { VerticalBlockInfo } from "./code-block";

function addIndent(str: string, indent: number): string {
  return str.padStart(indent * 4 + str.length, " ");
}

export default class PythonConverter {
  private static statements(
    statements: VerticalBlockInfo[],
    indent = 0,
  ): string[] {
    return statements
      .map(({ id }) => store.getModel(id))
      .flatMap(model => {
        switch (model.type) {
          case variableAssignBlockType:
            return PythonConverter.assignment(model, indent);
          case ifBlockType:
            return PythonConverter.if(model, indent);
          case whileBlockType:
            return PythonConverter.while(model, indent);
          case printBlockType:
            return PythonConverter.print(model, indent);
          default:
            throw new Error(
              `PythonConverter erorr: unknown vertical block type ${model.type}`,
            );
        }
      });
  }

  static program(): string[] {
    return this.statements(store.blocks, 0);
  }

  static number(model: NumberBlockModel): string {
    return model.props.number;
  }

  static variableName(model: VariableNameBlockModel): string {
    return model.props.variable;
  }

  static operator(model: OperatorBlockModel): string {
    const SUPPORTED_OPERATORS = {
      "+": "+",
      "-": "-",
      "*": "*",
      "/": "/",
      "//": "//",
      "%": "%",
      "^": "**",
      "=": "==",
      "<": "<",
      ">": ">",
      "<=": "<=",
      ">=": ">=",
      "<>": "!=",
    };

    const op = model.props.operator;

    if (op in SUPPORTED_OPERATORS)
      return SUPPORTED_OPERATORS[op as keyof typeof SUPPORTED_OPERATORS];

    throw new Error(
      `PythonConverter erorr: unknown operator ${model.props.operator}`,
    );
  }

  static assignment(model: VariableAssignBlockModel, indent = 0): string[] {
    const expression: string[] = [];

    model.expressionList.forEach(expr => {
      const exprModel = store.getModel(expr.id);

      switch (exprModel.type) {
        case numberBlockType:
          expression.push(PythonConverter.number(exprModel));
          break;
        case operatorBlockType:
          expression.push(PythonConverter.operator(exprModel));
          break;
        case variableNameBlockType:
          expression.push(PythonConverter.variableName(exprModel));
          break;
      }
    });

    return [
      addIndent(
        `${model.props.variable} = round(${expression.join(" ")}, 3)`,
        indent,
      ),
    ];
  }

  static if(model: IfBlockModel, indent = 0): string[] {
    const variableModel = store.getModel(
      model.expressionList[0].id,
    ) as VariableNameBlockModel;

    return [
      addIndent(
        `if ${PythonConverter.variableName(variableModel)} != 0 :`,
        indent,
      ),
      ...this.statements(model.statements, indent + 1),
    ];
  }

  static while(model: WhileBlockModel, indent = 0): string[] {
    const variableModel = store.getModel(
      model.expressionList[0].id,
    ) as VariableNameBlockModel;

    return [
      addIndent(
        `while ${PythonConverter.variableName(variableModel)} != 0 :`,
        indent,
      ),
      ...this.statements(model.statements, indent + 1),
    ];
  }

  static print(model: PrintBlockModel, indent = 0): string[] {
    const variableModel = store.getModel(
      model.expressionList[0].id,
    ) as VariableNameBlockModel;

    const variableName = PythonConverter.variableName(variableModel);

    return [
      addIndent(
        `print("Value of '${variableName}' is", ${variableName})`,
        indent,
      ),
    ];
  }
}
