"use client"; // This is a client component 
import { Button } from "@/server-components/common";
import { redirect } from "next/dist/server/api-utils";
import { useState, useEffect } from 'react'
import useSession from "@hooks/useSession";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/server-components/form";



export default function Login() {

    return (
        <section className="flex min-h-screen flex-col items-center justify-between p-24">
            <LoginForm />
        </section>
    );
}