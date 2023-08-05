'use client';

import { CreateStoreModal } from "@/component/modal/createStoreModal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return null;
    };

    return (
        <>
            <CreateStoreModal />
        </>
    );
};