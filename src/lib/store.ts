import {
  type CodeBlockType,
  codeBlocks,
  VerticalBlockType,
  VerticalBlockInfo,
  HorizontalBlockType,
} from "./code-block";
import { nanoid } from "nanoid/non-secure";
import {
  ConcreteModel,
  GenericCodeBlockModelWithExpression,
  GenericCodeBlockModelWithStatements,
} from "./code-block-models";

class Store {
  blockMap: Map<string, ConcreteModel> = new Map();
  blockBackLinks: Map<string, string> = new Map();
  blocks: VerticalBlockInfo[] = [];
  rerender: () => void = () => {};

  private createBlock(type: CodeBlockType): string {
    const id = nanoid();
    const block = new codeBlocks[type].model(id);
    this.blockMap.set(id, block);
    return id;
  }

  private isVerticalBlockType(type: CodeBlockType): type is VerticalBlockType {
    return codeBlocks[type].orientation == "vertical";
  }

  addBlock(type: VerticalBlockType, index?: number): void {
    const newBlockID = this.createBlock(type);
    this.blocks.splice(index ?? this.blocks.length, 0, {
      id: newBlockID,
      type,
    });

    this.rerender();
  }

  tryToAddBlock(type: CodeBlockType, index?: number): boolean {
    if (!this.isVerticalBlockType(type)) return false;
    this.addBlock(type, index);
    return true;
  }

  indexOf(id: string): number {
    return this.blocks.map(block => block.id).indexOf(id);
  }

  setProps(id: string, props: Record<string, unknown>): void {
    const block = this.blockMap.get(id)!;
    const oldProps = block.props;
    block.props = { ...oldProps, ...props };
    this.blockMap.set(id, block);

    this.rerender();
  }

  getModel(id: string): ConcreteModel {
    return this.blockMap.get(id)!;
  }

  addToExpression(
    parentModel: GenericCodeBlockModelWithExpression<unknown>,
    type: HorizontalBlockType,
  ): void {
    const exprBlockID = this.createBlock(type);
    parentModel.expressionList.push({ id: exprBlockID, type });
    this.blockBackLinks.set(exprBlockID, parentModel.id);

    this.rerender();
  }

  tryToAddToExpression(parentID: string, type: CodeBlockType): boolean {
    if (this.isVerticalBlockType(type)) return false;

    const parentModel = this.getModel(
      parentID,
    ) as GenericCodeBlockModelWithExpression<unknown>;

    if (parentModel.expressionAccpetedTypes.indexOf(type) == -1) return false;
    if (parentModel.expressionList.length >= parentModel.maxExpressionLength)
      return false;

    this.addToExpression(parentModel, type);
    return true;
  }

  addStatement(parentID: string, type: VerticalBlockType): void {
    const parentModel = this.getModel(
      parentID,
    ) as GenericCodeBlockModelWithStatements<unknown>;

    const ststementBlockID = this.createBlock(type);

    parentModel.statements.push({ id: ststementBlockID, type });
    this.blockBackLinks.set(ststementBlockID, parentModel.id);

    this.rerender();
  }

  tryToAddStatement(parentID: string, type: CodeBlockType): boolean {
    if (!this.isVerticalBlockType(type)) return false;
    this.addStatement(parentID, type);
    return true;
  }

  deleteBlock(id: string, firstLevel = false): void {
    const model = this.getModel(id);

    // delete expression
    if ("expressionList" in model)
      model.expressionList.forEach(expr => store.deleteBlock(expr.id));

    // delete statements
    if ("statements" in model)
      model.statements.forEach(expr => store.deleteBlock(expr.id));

    // delete from parent
    const parentID = this.blockBackLinks.get(id);
    if (parentID != undefined) {
      const parentModel = this.getModel(parentID);

      if ("expressionList" in parentModel)
        parentModel.expressionList = parentModel.expressionList.filter(
          ({ id: objID }) => objID !== id,
        );

      if ("statements" in parentModel)
        parentModel.statements = parentModel.statements.filter(
          ({ id: objID }) => objID !== id,
        );

      this.blockBackLinks.delete(id);
    }

    // delete from map
    this.blockMap.delete(id);

    // delete from arr
    this.blocks = this.blocks.filter(({ id: objID }) => objID !== id);

    if (firstLevel) this.rerender();
  }
}

const store = new Store();
export default store;
