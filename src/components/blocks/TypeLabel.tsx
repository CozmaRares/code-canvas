import { Input } from "@/components/ui/input";

type Props = {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string;
};

const TypeLabel = ({ text, setText, placeholder }: Props) => {
    return (
        <Input
            placeholder={placeholder}
            value={text}
            onChange={e => setText(e.target.value)}
            className="min-w-fit max-w-fit h-[2.5em]"
        />
    );
};

export default TypeLabel;
