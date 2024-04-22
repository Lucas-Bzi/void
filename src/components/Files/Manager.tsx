import { useAtom } from 'jotai';
import openFile from '../../atoms/openFile';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';

function retrieveFromLocalStorage() {
    return JSON.parse(localStorage.getItem('files') ?? '{}');
}

function saveToLocalStorage(newData: Record<string, string>) {
    localStorage.setItem('files', JSON.stringify(newData));
}

export default function FileManager() {
    const [content, setContent] = useAtom(openFile);
    const [loadedFiles, setLoadedFiles] = useState<Record<string, string>>();

    useEffect(() => {
        const files = retrieveFromLocalStorage();
        setLoadedFiles(files);

        if (files['Sem título']) {
            console.log('content', files['Sem título']);
            setContent({ name: 'Sem título', content: files['Sem título'], firstSet: true });
        }
    }, []);

    useEffect(() => {
        const newFiles = { ...loadedFiles, [content.name]: content.content };
        setLoadedFiles(newFiles);
        saveToLocalStorage(newFiles);
    }, [content]);

    return (
        <div>
            {Object.keys(loadedFiles ?? {}).map((title) => (
                <div>title</div>
            ))}
        </div>
    );
}
