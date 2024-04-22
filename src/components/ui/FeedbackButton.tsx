import { MessageSquare } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './dialog';

export default function FeedbackButton() {
    return (
        <>
            <Dialog>
                <DialogTrigger className="absolute bottom-4 right-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="w-8 aspect-square bg-purple-500 hover:bg-purple-600 rounded flex items-center justify-center">
                                <MessageSquare size={16} />
                            </TooltipTrigger>
                            <TooltipContent side="left">
                                <p className="text-xs">Enviar feedback</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Enviar Feedback</DialogTitle>
                        <DialogDescription>TODO</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
