'use client'
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import {useAuthContext} from "@/AuthContext";

export default function Page() {
    const { user } = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        if (user === null) {
            router.push("/")
        }
    }, [user])

    return (<h1>Only logged in users can view this page</h1>);
}
