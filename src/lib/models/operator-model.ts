import { GenericCodeBlockModel } from "./code-block-models";

export const operatorBlockType = "operator" as const;

type OperatorBlockProps = { operator: string };

export class OperatorBlockModel
  implements GenericCodeBlockModel<OperatorBlockProps>
{
  id: string;
  type = operatorBlockType;
  props: OperatorBlockProps;

  constructor(id: string) {
    this.id = id;
    this.props = { operator: "+" };
  }
}
