import { FormEvent, RefObject } from "react";

export interface TodoReqType {
    title: string;
    content: string;
}

export interface TodoResType {
    title: string;
    content: string;
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface TodoFormProp {
    titleRef: RefObject<HTMLInputElement>;
    contentRef: RefObject<HTMLInputElement>;
    isUpdating: boolean;
    onCancelUpdate: () => void;
    onSubmitTodo: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}
