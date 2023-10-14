import { type VariableAssignBlockModel } from "@/components/blocks/VariableAssignBlock";
import {
  type CodeBlockType,
  codeBlocks,
} from "@/components/blocks/utils/code-block";
import { nanoid } from "nanoid/non-secure";

type Block = VariableAssignBlockModel;

class Store {
  blockMap: Map<string, Block> = new Map();
  blocks: Block[] = [];
  rerender: () => void = () => {};

  addBlock(type: CodeBlockType, index?: number) {
    const id = nanoid();
    const newBlock = new codeBlocks[type].model(id);
    this.blockMap.set(id, newBlock);
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
}

const store = new Store();
export default store;
