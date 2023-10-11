import ThemeSwitch from "@/components/ThemeSwitch";
import ImportButton from "./ImportButton";
import ExportButton from "./ExportButton";

const Header = () => {
  return (
    <nav className="col-span-full flex items-center justify-end gap-3 px-6 py-2 shadow shadow-black">
      <h1 className="mr-auto text-2xl font-semibold">Code Canvas</h1>
      <ImportButton />
      <ExportButton />
      <ThemeSwitch />
    </nav>
  );
};

export default Header;
