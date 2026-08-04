"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";

type DropdownProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  width?: string;
};

export default function Dropdown({ trigger, children, width }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        {trigger}
      </button>
      {isOpen && (
        <div
          className={`absolute right-0 top-full z-50 mt-2 rounded-lg border border-muted bg-card p-2 shadow-lg ${width}`}
        >
          <div onClick={() => setIsOpen(false)}>{children}</div>
        </div>
      )}
    </div>
  );
}
