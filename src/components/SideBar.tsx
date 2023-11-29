import SideBarButton from "@/components/SideBarButton";
import { CodeBlockType } from "./blocks/utils/code-block";

const items: CodeBlockType[] = [
  "variable assign",
  "if",
  "while",
  "print",
  "variable name",
  "operator",
  "number",
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
