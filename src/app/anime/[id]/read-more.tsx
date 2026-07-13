"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ReadMore({text}: { text:string }){
    const [open, setOpen] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    useLayoutEffect(() => {
        if (!textRef.current || open) return;
        setIsTruncated(
            textRef.current.scrollHeight > textRef.current.clientHeight + 1
        );
    }, [text, open]);

    return (
        <div>
            <p ref={textRef} className={`text-muted-text ${open ? "" : "line-clamp-3"}`}>{text}</p>
            {(isTruncated || open) && (
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="mt-2 text-sm text-accent hover:underline"
            >
                <div className="flex flex-row gap-2 items-center">
                    <div>
                        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                    <div>
                        {open ? "Show less" : "Show more"}
                    </div>
                </div>
            </button>
            )}
        </div>
    )
}