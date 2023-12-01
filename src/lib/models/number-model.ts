import { GenericCodeBlockModel } from "../code-block-models";

export const numberBlockType = "number" as const;

type NumberBlockProps = { number: string };

export class NumberBlockModel
  implements GenericCodeBlockModel<NumberBlockProps>
{
  id: string;
  type = numberBlockType;
  props: NumberBlockProps;

  constructor(id: string) {
    this.id = id;
    this.props = { number: "" };
  }
}
