import SideBarButton from "@/components/SideBarButton";
import { CodeBlockType } from "@/lib/code-block";
import { ComponentJSX } from "@/lib/helper-types";

const items: CodeBlockType[] = [
  "variable assign",
  "if",
  "while",
  "print",
  "variable name",
  "operator",
  "number",
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
