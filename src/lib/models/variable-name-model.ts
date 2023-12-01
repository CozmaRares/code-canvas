import { GenericCodeBlockModel } from "../code-block-models";

export const variableNameBlockType = "variable name" as const;

type VariableNameBlockProps = { variable: string };

export class VariableNameBlockModel
  implements GenericCodeBlockModel<VariableNameBlockProps>
{
  id: string;
  type = variableNameBlockType;
  props: VariableNameBlockProps;

  constructor(id: string) {
    this.id = id;
    this.props = { variable: "" };
  }
}
