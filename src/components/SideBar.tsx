import SideBarButton from "@/components/SideBarButton";
import { CodeBlockType } from "@/lib/code-block";
import { ifBlockType } from "@/lib/models/if-model";
import { numberBlockType } from "@/lib/models/number-model";
import { operatorBlockType } from "@/lib/models/operator-model";
import { printBlockType } from "@/lib/models/print-model";
import { variableAssignBlockType } from "@/lib/models/variable-assignment-model";
import { variableNameBlockType } from "@/lib/models/variable-name-model";
import { whileBlockType } from "@/lib/models/while-model";
import { ComponentJSX } from "@/lib/utils";

const items: CodeBlockType[] = [
  variableAssignBlockType,
  ifBlockType,
  whileBlockType,
  printBlockType,
  variableNameBlockType,
  operatorBlockType,
  numberBlockType,
];

const SideBar: ComponentJSX<unknown> = () => (
  <aside className="w-fit border-r border-black p-8 dark:border-white">
    <ul className="flex w-fit flex-col items-center justify-center gap-1">
      {items.map(type => (
        <li key={type}>
          <SideBarButton type={type} />
        </li>
      ))}
    </ul>
  </aside>
);

export default SideBar;
