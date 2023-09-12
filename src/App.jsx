import { useState } from 'react';
import { Book, Menu } from 'react-feather';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip';
import Logo from './components/ui/Logo';
import Editor from './components/Editor/Editor';
import FeedbackButton from './components/FeedbackButton/FeedbackButton';

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [docsOpen, setDocsOpen] = useState(false);

    return (
        <div className="h-screen w-screen flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
            <header className="flex justify-between w-screen px-2 p-1 bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 border-b">
                <TooltipProvider>
                    <div className="flex items-center justify-center gap-2">
                        <Tooltip>
                            <TooltipTrigger
                                onClick={() => setMenuOpen((prev) => !prev)}
                                data-menuOpen={menuOpen}
                                className="aspect-square p-1 rounded hover:bg-zinc-50/5 data-[menuOpen=true]:bg-zinc-50/10"
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
                            data-docsOpen={docsOpen}
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
                    data-menuOpen={menuOpen}
                    className="w-0 data-[menuOpen=true]:w-64 transition-[width] bg-zinc-100 dark:bg-zinc-900 border-zinc-200 border-r dark:border-zinc-800"
                ></aside>
                <main className="flex-grow h-auto overflow-auto relative">
                    <Editor />
                    <FeedbackButton />
                </main>
                <aside
                    data-docsOpen={docsOpen}
                    className="w-0 data-[docsOpen=true]:w-[30rem] transition-[width] ml-auto bg-zinc-100 border-zinc-200 dark:bg-zinc-900 border-l dark:border-zinc-800"
                ></aside>
            </div>
        </div>
    );
}
