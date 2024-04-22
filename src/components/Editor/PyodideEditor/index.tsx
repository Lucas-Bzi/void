import { NodeViewWrapper } from '@tiptap/react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { useState } from 'react';
import { Play, RotateCw } from 'react-feather';
import { loadPyodide } from 'pyodide';

export function PyodideEditor() {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    async function handleEvaluateCode() {
        setOutput([]);
        setIsRunning(true);
        const pyodide = await loadPyodide({
            indexURL: 'src/lib/pyodide',
        });
        pyodide.setStdout({ batched: (msg) => setOutput((prev) => [...prev, msg]) });
        await pyodide.runPythonAsync(code);
        setIsRunning(false);
    }

    return (
        <NodeViewWrapper className="not-prose">
            <div className="relative">
                <CodeEditor
                    value={code}
                    language="python"
                    placeholder="Digite código Python"
                    onChange={(event) => setCode(event.target.value)}
                    minHeight={80}
                    padding={20}
                    spellCheck={false}
                    className="text-sm font-mono bg-zinc-900 rounded-md"
                />
                <div className="absolute right-3 top-3 rounded-md">
                    {isRunning ? (
                        <button
                            type="button"
                            contentEditable={false}
                            className="text-xs bg-zinc-500 raspect-square rounded p-2 flex items-center gap-1 text-white font-semibold hover:bg-zinc-600"
                        >
                            <div className="animate-spin">
                                <RotateCw color="#FFF" size={16} />
                            </div>
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleEvaluateCode}
                            contentEditable={false}
                            className="text-xs bg-purple-500 aspect-square rounded p-2 flex items-center gap-1 text-white font-semibold hover:bg-purple-600"
                        >
                            <Play color="#FFF" size={16} />
                        </button>
                    )}
                </div>
            </div>
            {Object.values(output).length > 0 && (
                <div
                    className="bg-black p-5 min-h-[64px] rounded mt-2 text-sm"
                    contentEditable={false}
                    spellCheck={false}
                >
                    <div className="font-mono text-xs leading-loose">
                        {Object.entries(output).map(([name, value]) => {
                            return <p key={name} dangerouslySetInnerHTML={{ __html: `${name}: ${value}` }} />;
                        })}
                    </div>
                </div>
            )}
        </NodeViewWrapper>
    );
}
