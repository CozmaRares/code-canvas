import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SideBarButton from "@/components/SideBarButton";

const SideBar = () => (
  <aside className="w-[300px] border-r border-black p-8 dark:border-white">
    <Accordion
      type="single"
      className="w-full [&_ul]:space-y-2 [&_ul]:p-1"
    >
      <AccordionItem value="variables & values">
        <AccordionTrigger className="font-normal">
          Variables & Values
        </AccordionTrigger>
        <AccordionContent>
          <ul>
            <li>
              <SideBarButton type="variable assign" />
            </li>
            <li>
              <SideBarButton type="variable name" />
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </aside>
);

export default SideBar;
