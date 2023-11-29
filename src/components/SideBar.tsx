import SideBarButton from "@/components/SideBarButton";
import { CodeBlockType } from "./blocks/utils/code-block";

const items: CodeBlockType[] = [
  "variable assign",
  "variable name",
  "number",
  "operator",
  "if",
  "while",
  "print",
];

const SideBar = () => (
  <aside className="w-[300px] border-r border-black p-8 dark:border-white">
    <ul>
      {items.map(type => (
        <li key={type}>
          <SideBarButton type={type} />
        </li>
      ))}
    </ul>
  </aside>
);

export default SideBar;
