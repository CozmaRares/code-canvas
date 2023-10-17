import {
  type CodeBlockType,
  codeBlocks,
  ConcreteModel,
  GenericCodeBlockModelWithChildren,
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

    console.log(type, parentModel.childrenTypes);

    if (parentModel.childrenTypes.indexOf(type) == -1) return false;

    const childBlock = this.createBlock(type);

    parentModel.children.push({ id: childBlock.id, type });
  }
}

const store = new Store();
export default store;
