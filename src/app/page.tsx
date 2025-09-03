"use client";

import { useState, useEffect, FormEvent } from "react";

export default function Home() {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ip, setIp] = useState("");

    useEffect(() => {
        // Get client IP from an API route
        fetch("/api/ip")
            .then((res) => res.json())
            .then((data) => setIp(data.ip));
    }, []);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        const inputValue = formData.get("input") as string;
        const ipValue = formData.get("ip") as string;

        const res = await fetch("/api/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ input: inputValue, ip: ipValue }),
        });

        if (res.ok) {
            setSuccess(true);
            (e.target as HTMLFormElement).reset();
        }

        setLoading(false);
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black px-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-12 text-center">
                Was söll da ane?
            </h1>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md flex flex-col space-y-6"
            >
                <input
                    type="text"
                    name="input"
                    placeholder="Type hier..."
                    className="w-full border-b-2 border-red focus:outline-none focus:border-red-500 text-lg py-2 placeholder-gray-400"
                    required
                />

                {/* Hidden IP field */}
                <input type="hidden" name="ip" value={ip} />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white rounded-2xl py-3 font-medium hover:bg-red-500 transition-colors disabled:opacity-50"
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>

            {success && (
                <p className="mt-6 text-green-600 text-lg font-medium">
                    🇨🇭 Success! Dankä tuusig!
                </p>
            )}

            {/* Info + Link Section */}
            <div className="mt-12 text-center">
                <p className="text-gray-700 text-lg mb-2">
                    Did you know Switzerland has its own LLM now?
                </p>
                <a
                    href="https://www.swiss-ai.org/apertus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 font-semibold text-lg hover:underline transition-colors tracking-wide"
                >
                    Apertus
                </a>
            </div>

        </main>
    );
}
