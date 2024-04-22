import { useState, useRef } from 'react';
import { Book, Home, Menu } from 'react-feather';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip';
import Logo from './components/ui/Logo';
import Editor from './components/Editor/Editor';
import FeedbackButton from './components/ui/FeedbackButton';
import FilesManager from './components/Files/Manager';

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [docsOpen, setDocsOpen] = useState(false);
    //prettier-ignore
    const frame = useRef(null);

    function reloadFrame() {
        if (!frame.current) return;
        frame.current.src += '';
    }

    return (
        <div className="h-screen w-screen flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
            <header className="flex justify-between w-screen px-2 p-1 bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 border-b">
                <TooltipProvider>
                    <div className="flex items-center justify-center gap-2">
                        <Tooltip>
                            <TooltipTrigger
                                onClick={() => setMenuOpen((prev) => !prev)}
                                data-menuopen={menuOpen}
                                className="aspect-square p-1 rounded hover:bg-zinc-50/5 data-[menuopen=true]:bg-zinc-50/10"
                            >
                                <Menu size={16} />
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p className="text-xs">{menuOpen ? 'Fechar Menu' : 'Abrir Menu'}</p>
                            </TooltipContent>
                        </Tooltip>
                        <Logo />
                    </div>
                    <Tooltip>
                        <TooltipTrigger
                            onClick={() => setDocsOpen((prev) => !prev)}
                            data-docsopen={docsOpen}
                            className="aspect-square p-1 rounded hover:bg-zinc-50/5 data-[docsOpen=true]:bg-zinc-50/10"
                        >
                            <Book size={16} />
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            <p className="text-xs">{docsOpen ? 'Fechar Documentação' : 'Abrir Documentação'}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </header>
            <div className="flex w-full h-full min-h-0">
                <aside
                    data-menuopen={menuOpen}
                    className="w-64 data-[menuopen=false]:hidden bg-zinc-100 dark:bg-zinc-900 border-zinc-200 border-r dark:border-zinc-800"
                >
                    <FilesManager />
                </aside>
                <main className="flex-grow h-auto overflow-auto relative">
                    <Editor />
                    <FeedbackButton />
                </main>
                <aside
                    data-docsopen={docsOpen}
                    className="w-[30rem] data-[docsopen=false]:hidden relative ml-auto bg-zinc-100 border-zinc-200 dark:bg-zinc-900 border-l dark:border-zinc-800"
                >
                    {docsOpen && (
                        <button
                            onClick={reloadFrame}
                            className="absolute left-10 w-10 h-10 bg-black flex items-center justify-center hover:bg-[#333]"
                        >
                            <Home size={20} color="white" />
                        </button>
                    )}
                    <iframe ref={frame} src="https://docs.python.org/pt-br/3.12/" className="h-full w-full"></iframe>
                </aside>
            </div>
        </div>
    );
}
