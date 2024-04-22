import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Document from '@tiptap/extension-document';

import './styles/placeholder.css';
import { EditorBlock } from './plugins/EditorBlock';
import { TrailingNode } from './plugins/TrailingNode';
import openFile from '../../atoms/openFile';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

export default function Editor() {
    const [content, setContent] = useAtom(openFile);

    const editor = useEditor({
        extensions: [
            Document.extend({
                content: 'heading block*',
            }),
            StarterKit.configure({
                codeBlock: false,
                document: false,
            }),
            Placeholder.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === 'heading') {
                        return 'Sem título';
                    }

                    if (node.type.name === 'editorBlock') {
                        return '';
                    }

                    return "Digite '/' para ver comandos...";
                },
            }),
            EditorBlock,
            TrailingNode,
        ],
        content: content.content ? JSON.parse(content.content) : '',
        editorProps: {
            attributes: {
                class: 'outline-none',
            },
        },
        onUpdate: ({ editor }) => {
            setContent((prev) => ({ name: prev.name, content: JSON.stringify(editor.getJSON()) }));
        },
    });

    useEffect(() => {
        if (content.firstSet) {
            editor?.commands.setContent(content.content ? JSON.parse(content.content) : '');
            setContent((prev) => ({ ...prev, firstSet: false }));
        }
    }, [content]);

    return (
        <div className="mx-auto max-w-[800px] h-full p-8 prose prose-zinc dark:prose-invert prose-violet dark:prose-pre:bg-zinc-900">
            <EditorContent editor={editor} />
        </div>
    );
}
