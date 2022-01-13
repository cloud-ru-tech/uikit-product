# React Markdown Editor

## Installation
`npm i @sbercloud/uikit-react-markdown-editor`

## Props
```typescript
export type MarkdownEditorProps = {
  value: string;
  mode: MarkdownEditorMode;
  onChange(value: string, e?: ChangeEvent<HTMLTextAreaElement>): void;
  placeholder?: string;
  className?: string;
  remarkPlugins?: ReactMarkdownOptions['remarkPlugins'];
  rehypePlugins?: ReactMarkdownOptions['rehypePlugins'];
  components?: ReactMarkdownOptions['components'];
  skipHtml?: boolean;
};

export enum MarkdownEditorMode {
  View = 'View',
  Edit = 'Edit',
}
```


