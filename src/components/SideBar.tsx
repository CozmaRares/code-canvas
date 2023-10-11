import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SideBarButton } from "@/components/SideBarButton";
import { codeBlocks } from "@/components/blocks/utils/code-block";

const SideBar = () => (
  <aside className="w-[400px] p-8">
    <Accordion
      type="single"
      className="w-full"
    >
      <AccordionItem value="variables">
        <AccordionTrigger className="font-normal">
          Variables & Values
        </AccordionTrigger>
        <AccordionContent>
          <ul className="p-0.5">
            <li>
              <SideBarButton
                type="variable assign"
                blockPreview={codeBlocks["variable assign"].preview}
              />
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </aside>
);

export default SideBar;
