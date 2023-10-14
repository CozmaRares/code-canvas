import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SideBarButton from "@/components/SideBarButton";

const SideBar = () => (
  <aside className="w-[400px] p-8">
    <Accordion
      type="single"
      className="w-full [&_ul]:space-y-2 [&_ul]:p-0.5"
    >
      <AccordionItem value="variables">
        <AccordionTrigger className="font-normal">
          Variables & Values
        </AccordionTrigger>
        <AccordionContent>
          <ul className="p-0.5">
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
