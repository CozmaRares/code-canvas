import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SideBar = () => (
  <aside className="w-[400px] p-8">
    <Accordion
      type="single"
      className="w-full"
    >
      <AccordionItem value="variables">
        <AccordionTrigger className="font-normal">Variables</AccordionTrigger>
        <AccordionContent></AccordionContent>
      </AccordionItem>
    </Accordion>
  </aside>
);

export default SideBar;
