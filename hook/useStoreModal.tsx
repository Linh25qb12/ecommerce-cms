import { create } from "zustand";

export type useStoreModal = {
    isOpen: boolean,
    onOpen: () => void,
    onOk: () => void,
    onCancle: () => void,
};

export const useStoreModal = create<useStoreModal>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onOk: () => set({isOpen: false}),
    onCancle: () => set({isOpen: false}),
}));