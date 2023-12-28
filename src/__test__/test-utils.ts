import { codeBlocks } from "@/lib/code-block";
import {
  GenericCodeBlockModel,
  GenericCodeBlockModelWithExpression,
  GenericCodeBlockModelWithStatements,
} from "@/lib/models/code-block-models";
import store from "@/lib/store";

type CBType = typeof codeBlocks;

type Prototype<T> = T extends keyof CBType
  ? CBType[T]["model"]["prototype"]
  : never;

type Props<T> = T extends keyof CBType
  ? Prototype<T> extends GenericCodeBlockModel<infer TT>
    ? TT
    : never
  : never;

type HorizontalBlocksObj = {
  [K in keyof CBType]: CBType[K] extends { orientation: "horizontal" }
    ? [K, Props<K>]
    : never;
};

type HorizontalBlocks<T> = T extends keyof CBType
  ? HorizontalBlocksObj[T]
  : never;

type ExpressionTypes<T> =
  Prototype<T> extends GenericCodeBlockModelWithExpression<object>
    ? Prototype<T>["expressionAccpetedTypes"] extends Readonly<Array<infer TT>>
      ? HorizontalBlocks<TT>
      : never
    : never;

export type VerticalBlock = {
  [K in keyof CBType]: CBType[K] extends { orientation: "vertical" }
    ? Prototype<K> extends GenericCodeBlockModelWithStatements<object>
      ? {
          type: K;
          props: Props<K>;
          expression: Array<ExpressionTypes<K>>;
          statements: Array<VerticalBlock>;
        }
      : Prototype<K> extends GenericCodeBlockModelWithExpression<object>
      ? {
          type: K;
          props: Props<K>;
          expression: Array<ExpressionTypes<K>>;
        }
      : { type: K; props: Props<K> }
    : never;
}[keyof CBType];

export function setupStore(blocks: Array<VerticalBlock>): void {
  store.clearBlocks();
  blocks.forEach(block => {
    const id = store.addBlock(block.type);
    store.setProps(id, block.props);
    if ("expression" in block) addExpression(id, block.expression);
    if ("statements" in block) addStatements(id, block.statements);
  });
}

function addExpression(
  parentID: string,
  exprList: Array<HorizontalBlocksObj[keyof CBType]>,
): void {
  const model = store.getModel(
    parentID,
  ) as GenericCodeBlockModelWithExpression<unknown>;

  if (exprList.length > model.maxExpressionLength)
    throw new Error(
      `INCORRECT TEST SETUP: model ${model.type} received ${exprList.length} nodes for the expression, when it can only have ${model.maxExpressionLength}`,
    );

  exprList.forEach(([type, props]) => {
    const id = store.addToExpression(model, type);
    store.setProps(id, props);
  });
}

function addStatements(
  parentID: string,
  statements: Array<VerticalBlock>,
): void {
  statements.forEach(block => {
    const id = store.addStatement(parentID, block.type);
    store.setProps(id, block.props);
    if ("expression" in block) addExpression(id, block.expression);
    if ("statements" in block) addStatements(id, block.statements);
  });
}
