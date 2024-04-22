import { Node, textblockTypeInputRule } from '@tiptap/core';
import { mergeAttributes, ReactNodeViewRenderer } from '@tiptap/react';
import { PyodideEditor } from '../PyodideEditor';
import { v4 as uuid } from 'uuid';

export const backtickInputRegex = /^```([a-z]+)?[\s\n]$/;

export const EditorBlock = Node.create({
    name: 'editorBlock',
    content: 'text*',
    marks: '',
    group: 'block',
    code: true,
    defining: true,
    isolating: true,

    renderText() {
        return '';
    },

    addOptions() {
        return {
            languageClassPrefix: 'language-',
            exitOnTripleEnter: true,
            exitOnArrowDown: true,
            HTMLAttributes: {
                class: 'bg-zinc-300',
            },
        };
    },

    addInputRules() {
        return [
            textblockTypeInputRule({
                find: backtickInputRegex,
                type: this.type,
            }),
        ];
    },

    addKeyboardShortcuts() {
        return {
            Enter: ({ editor }) => {
                return false;
            },
            Backspace: ({ editor }) => {
                editor.commands.deleteCurrentNode();
                return false;
            },
        };
    },

    addNodeView() {
        return ReactNodeViewRenderer(PyodideEditor);
    },

    parseHTML() {
        return [{ tag: 'editor-block' }];
    },

    addAttributes() {
        return { 'data-content': 'a' };
    },

    renderHTML({ HTMLAttributes }) {
        return ['editor-block', mergeAttributes(HTMLAttributes)];
    },
});
