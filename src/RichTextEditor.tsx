import React, { JSX, useMemo } from 'react';
import { Descendant } from 'slate';
import { Slate, Editable, withReact, ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react';
import { withHistory } from 'slate-history';
import { createEditor } from 'slate';

interface RichTextEditorProps {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
  const editor: ReactEditor = useMemo(() => withHistory(withReact(createEditor() as ReactEditor)), []);

  return (
    <Slate editor={editor} initialValue={value} onChange={onChange}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder={placeholder}
        spellCheck
        autoFocus
      />
    </Slate>
  );
};

const renderElement = ({ attributes, children, element }: RenderElementProps): JSX.Element => {
  switch (element.type) {
    case 'quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'code':
      return (
        <pre {...attributes}>
          <code>{children}</code>
        </pre>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps): JSX.Element => {
  let modifiedChildren = children;

  if (leaf.bold) modifiedChildren = <strong>{modifiedChildren}</strong>;
  if (leaf.italic) modifiedChildren = <em>{modifiedChildren}</em>;
  if (leaf.underline) modifiedChildren = <u>{modifiedChildren}</u>;

  return <span {...attributes}>{modifiedChildren}</span>;
};

export default RichTextEditor;
