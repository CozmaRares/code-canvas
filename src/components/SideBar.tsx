import blocks from "@/components/blocks/blocks";
import { SideBarButton } from "./SideBarButton";

const SideBar = () => (
  <aside className="min-h-screen max-w-[300px] border p-8">
    <ul>
      {Object.entries(blocks).map(([key, { preview }]) => (
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
