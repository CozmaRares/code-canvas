import CodeBlock, {
  BaseCodeBlockProps,
} from "@/components/blocks/utils/CodeBlock";

export type CodeBlockPreviewProps = BaseCodeBlockProps & {
  text: string;
};

const CodeBlockPreview = (props: CodeBlockPreviewProps) => (
  <CodeBlock
    {...props}
    isPreview
  >
    {props.text}
  </CodeBlock>
);

export default CodeBlockPreview;
