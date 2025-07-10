"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { LuPackageSearch } from "react-icons/lu";

type Props = {
  onSubmit: (code: string) => void;
};

export default function TrackCodeInput({ onSubmit }: Props) {
  const [digits, setDigits] = useState(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const searchParams = useSearchParams();
  const isPasting = useRef(false); // 👈 Used to suppress handleChange during paste


  // Autofill from URL
  useEffect(() => {
    const trackCode = searchParams.get("code");
    if (trackCode && trackCode.length === 6) {
      fillCode(trackCode);
    }
  }, [searchParams]);

  const fillCode = (code: string) => {
    const arr = code.slice(0, 6).split("");
    setDigits(arr);

    setTimeout(() => {
      inputsRef.current[arr.length - 1]?.focus();
    }, 0);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    isPasting.current = true;

    const pasted = e.clipboardData.getData("Text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      fillCode(pasted);
    }

    setTimeout(() => {
      isPasting.current = false;
    }, 0);
  };

  const handleChange = (index: number, value: string) => {
    if (isPasting.current) return; // 👈 Skip change during paste

    if (!/^\d$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    if (index < 5) {
      inputsRef.current[index + 1]?.focus();
      inputsRef.current[index + 1]?.select();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace") {
      if (digits[idx]) {
        const newDigits = [...digits];
        newDigits[idx] = "";
        setDigits(newDigits);
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
      }
    }
  };

  const code = digits.join("");
  const isComplete = code.length === 6;

  return (
    <div className="max-w-md mx-auto p-6 rounded border bg-white dark:bg-zinc-900 shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Track Your Insurance Order</h2>

      <div className="flex justify-center gap-2 mb-6">
        {digits.map((digit, idx) => (
          <Input
            key={idx}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(idx, e.target.value.slice(-1))}
            onPaste={handlePaste}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            ref={(el) => {
              inputsRef.current[idx] = el;
            }}
            className="w-12 h-12 text-center text-lg font-mono"
            onFocus={() => {
              inputsRef.current[idx]?.select();
            }}
          />
        ))}
      </div>

      <Button
        className="w-full flex items-center justify-center gap-2"
        disabled={!isComplete}
        onClick={() => onSubmit(code)}
      >
        <LuPackageSearch /> Track Code
      </Button>
    </div>
  );
}
