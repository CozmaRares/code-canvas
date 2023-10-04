type Props = {
    x: number;
    y: number;
    bg: string;
    topSlot?: boolean;
    children?: React.ReactNode;
};

const CodeBlock = ({ x, y, bg, topSlot, children }: Props) => (
    <div
        className={`absolute rounded-lg ${bg}`}
        style={{ top: `${y}px`, left: `${x}px` }}
    >
        <div className="relative flex flex-row items-center gap-2 whitespace-nowrap p-4">
            {topSlot != false && (
                <div className="absolute top-0 z-[1] aspect-square w-6 -translate-y-1/2 rounded-full bg-background" />
            )}
            <div
                className={`absolute top-full z-[2] aspect-square w-6 -translate-y-1/2 rounded-full ${bg}`}
            />
            {children}
            <div />
        </div>
    </div>
);

export default CodeBlock;
