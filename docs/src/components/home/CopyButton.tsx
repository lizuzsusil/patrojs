import {useCallback, useState} from "react";

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false)
    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
    }, [text])

    return (
        <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? 'Copied' : 'Copy to clipboard'}
            className="shrink-0 rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
        >
            {copied ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
            )}
        </button>
    )
}

export default CopyButton;