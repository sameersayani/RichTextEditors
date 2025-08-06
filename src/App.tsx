import React, { useState } from 'react';
import RichTextEditor  from './RichTextEditor';
import { Descendant } from 'slate';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'This is editable rich text!' }],
  },
];

function App() {
  const [value, setValue] = useState<Descendant[]>(initialValue);

  return (
    <div style={{ padding: 20 }}>
      <RichTextEditor value={value} onChange={setValue} />
    </div>
  );
}
