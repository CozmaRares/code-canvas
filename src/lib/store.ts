import {
  type CodeBlockType,
  codeBlocks,
  ConcreteModel,
  GenericCodeBlockModelWithStatements,
  VerticalBlockType,
  VerticalBlockInfo,
  GenericCodeBlockModelWithExpression,
  HorizontalBlockType,
} from "./code-block";
import { nanoid } from "nanoid/non-secure";

class Store {
  blockMap: Map<string, ConcreteModel> = new Map();
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
    const childBlockID = this.createBlock(type);
    parentModel.children.push({ id: childBlockID, type });
  }

  tryToAddToExpression(parentID: string, type: CodeBlockType): boolean {
    if (this.isVerticalBlockType(type)) return false;

    const parentModel = this.getModel(
      parentID,
    ) as GenericCodeBlockModelWithExpression<unknown>;

    if (parentModel.childrenTypes.indexOf(type) == -1) return false;
    if (parentModel.children.length >= parentModel.maxChildrenLength)
      return false;

    this.addToExpression(parentModel, type);
    return true;
  }

  addStatement(parentID: string, type: VerticalBlockType): void {
    const parentModel = this.getModel(
      parentID,
    ) as GenericCodeBlockModelWithStatements<unknown>;

    const childBlockID = this.createBlock(type);

    parentModel.statements.push({ id: childBlockID, type });
  }

  tryToAddStatement(parentID: string, type: CodeBlockType): boolean {
    if (!this.isVerticalBlockType(type)) return false;
    this.addStatement(parentID, type);
    return true;
  }
}

const store = new Store();
export default store;
