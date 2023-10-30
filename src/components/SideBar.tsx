import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SideBarButton from "@/components/SideBarButton";
import { CodeBlockType } from "./blocks/utils/code-block";

type AccordionProps = Record<string, CodeBlockType[]>;

const accordionProps: AccordionProps = {
  "variables & values": [
    "variable assign",
    "variable name",
    "number",
    "operator",
  ],
};

const SideBar = () => (
  <aside className="w-[300px] border-r border-black p-8 dark:border-white">
    <AccordionBuilder {...accordionProps} />
  </aside>
);

const AccordionBuilder = (props: AccordionProps) => (
  <Accordion
    type="single"
    className="w-full [&_ul]:space-y-2 [&_ul]:p-1"
  >
    {Object.entries(props).map(([key, blockTypes]) => (
      <AccordionItem
        value={key}
        key={key}
      >
        <AccordionTrigger className="font-normal capitalize">
          {key}
        </AccordionTrigger>
        <AccordionContent>
          <ul>
            {blockTypes.map(type => (
              <li key={type}>
                <SideBarButton type={type} />
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export default SideBar;
