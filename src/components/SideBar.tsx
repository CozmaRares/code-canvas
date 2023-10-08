import codeBlocks from "@/components/blocks/codeBlocks";
import { SideBarButton } from "./SideBarButton";

const SideBar = () => (
  <aside className="min-h-screen max-w-[300px] border p-8">
    <ul>
      {Object.entries(codeBlocks).map(([key, { preview }]) => (
        <li key={key}>
          <SideBarButton
            type={key}
            blockPreview={preview}
          />
        </li>
      ))}
    </ul>
  </aside>
);

export default SideBar;
