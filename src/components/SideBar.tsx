import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SideBar = () => (
  <aside className="min-h-screen w-[400px] border p-8">
    <Accordion
      type="single"
      className="w-full"
    >
      <AccordionItem value="variables">
        <AccordionTrigger>Variables</AccordionTrigger>
        <AccordionContent>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </aside>
);

export default SideBar;
