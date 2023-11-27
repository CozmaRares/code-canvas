import {
  type CodeBlockType,
  codeBlocks,
  ConcreteModel,
  GenericCodeBlockModelWithChildren,
  GenericCodeBlockModelWithStatements,
} from "@/components/blocks/utils/code-block";
import { nanoid } from "nanoid/non-secure";

class Store {
  blockMap: Map<string, ConcreteModel> = new Map();
  blocks: ConcreteModel[] = [];
  rerender: () => void = () => {};

  private createBlock(type: CodeBlockType) {
    const id = nanoid();
    const block = new codeBlocks[type].model(id);
    this.blockMap.set(id, block);
    return block;
  }

  addBlock(type: CodeBlockType, index?: number) {
    const newBlock = this.createBlock(type);
    this.blocks.splice(index ?? this.blocks.length, 0, newBlock);
    this.rerender();
  }

  indexOf(id: string) {
    return this.blocks.map(block => block.id).indexOf(id);
  }

  setProps(id: string, props: Record<string, unknown>) {
    const block = this.blockMap.get(id)!;
    const oldProps = block.props;
    block.props = { ...oldProps, ...props };
    this.blockMap.set(id, block);
    this.rerender();
  }

  getModel(id: string) {
    return this.blockMap.get(id)!;
  }

  addChild(parentID: string, type: CodeBlockType) {
    const parentModel = this.getModel(
      parentID,
    ) as GenericCodeBlockModelWithChildren<unknown>;

    if (parentModel.childrenTypes.indexOf(type) == -1) return false;
    if (parentModel.children.length >= parentModel.maxChildrenLength)
      return false;

    const childBlock = this.createBlock(type);

    parentModel.children.push({ id: childBlock.id, type });
  }

  addStatement(parentID: string, type: CodeBlockType) {
    if (codeBlocks[type].orientation != "vertical") return false;

    const parentModel = this.getModel(
      parentID,
    ) as GenericCodeBlockModelWithStatements<unknown>;

    const childBlock = this.createBlock(type);

    parentModel.statements.push({ id: childBlock.id, type });
  }
}

const store = new Store();
export default store;
