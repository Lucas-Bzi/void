import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { LeveldbPersistence } from 'y-leveldb';
import { useEffect, useState } from 'react';

export default function Editor() {
    const [content, setContent] = useState('');

    console.log(content);

    const editor = useEditor({
        extensions: [StarterKit],
        content: content ? JSON.parse(content) : content,
        editorProps: {
            attributes: {
                class: 'outline-none',
            },
        },
        onUpdate: ({ editor }) => {
            setContent(JSON.stringify(editor.getJSON()));
        },
    });

    return (
        <div className="mx-auto max-w-[800px] h-full p-8 prose prose-zinc dark:prose-invert prose-violet dark:prose-pre:bg-zinc-900">
            <EditorContent editor={editor} />
        </div>
    );
}
