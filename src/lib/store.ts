import { type VariableAssignBlockModel } from "@/components/blocks/VariableAssignBlock";
import {
  type CodeBlockType,
  codeBlocks,
} from "@/components/blocks/utils/code-block";
import { nanoid } from "nanoid/non-secure";

type Blocks = VariableAssignBlockModel;

class Store {
  blocks: Blocks[] = [];
  rerender: () => void = () => {};

  addBlock(type: CodeBlockType, index?: number) {
    const id = nanoid();
    const newBlock = new codeBlocks[type].model(id);
    this.blocks.splice(index ?? this.blocks.length, 0, newBlock);
    this.rerender();
  }

  setProps(idx: number, props: Record<string, unknown>) {
    const oldProps = this.blocks[idx].props;
    const block = this.blocks[idx];
    block.props = { ...oldProps, ...props };
    this.blocks[idx] = block;
    this.rerender();
  }

  getModel(idx: number) {
    return this.blocks[idx];
  }
}

const store = new Store();
export default store;
