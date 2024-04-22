import { atom } from "jotai";

export default atom<{ name: string, content: string, firstSet?: boolean }>(
    { name: 'Sem título', content: '', firstSet: false }
); 