import { MessageSquare } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

export default function FeedbackButton() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className=" absolute bottom-4 right-4 w-8 aspect-square bg-purple-500 hover:bg-purple-600 rounded flex items-center justify-center">
                    <MessageSquare size={16} />
                </TooltipTrigger>
                <TooltipContent side="left">
                    <p className="text-xs">Enviar feedback</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
