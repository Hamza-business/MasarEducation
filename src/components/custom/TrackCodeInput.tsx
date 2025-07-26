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
  const [disabled, setDisabled] = useState(false);

  // Autofill from URL
  useEffect(() => {
    const trackCode = searchParams.get("code");
    if (trackCode && trackCode.length === 6) {
      fillCode(trackCode.toUpperCase());
      onSubmit(trackCode.toUpperCase());
      setDisabled(true);
    }
  }, [searchParams]);

  const fillCode = (code: string) => {
    const arr = code.toUpperCase().slice(0, 6).split("");
    setDigits(arr);

    setTimeout(() => {
      inputsRef.current[arr.length - 1]?.focus();
    }, 0);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    isPasting.current = true;

    // const pasted = e.clipboardData.getData("Text").replace(/\D/g, "").slice(0, 6); // for digit codes only
    const pasted = e.clipboardData.getData("Text").toUpperCase().slice(0, 6);
    if (pasted.length === 6) {
      setDisabled(false);
      fillCode(pasted);
    }

    setTimeout(() => {
      isPasting.current = false;
    }, 0);
  };

  const handleChange = (index: number, value: string) => {
    if (isPasting.current) return;

    // if (!/^\d$/.test(value)) return; // for Digit codes only

    const newDigits = [...digits];
    newDigits[index] = value.toUpperCase();
    setDisabled(false);
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
      <div className="grid gap-4 border-gray-200 bg-white dark:bg-zinc-900 rounded-sm p-4 shadow-sm border dark:border-zinc-800 transition-colors">
        <h2 className="text-2xl font-semibold mb-2 text-center text-[#103c5c]">Track Your Insurance Order</h2>

        <div className="flex justify-center gap-2 mb-4">
          {digits.map((digit, idx) => (
            <Input
              key={idx}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value.slice(-1))}
              onPaste={handlePaste}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => {
                inputsRef.current[idx] = el;
              }}
              className="w-1/6 h-12 text-center text-lg font-mono rounded-sm"
              onFocus={() => {
                inputsRef.current[idx]?.select();
              }}
            />
          ))}
        </div>

        <Button
          className="w-full flex items-center justify-center gap-2 rounded-sm py-5 text-base bg-[#103c5c] text-white"
          disabled={!isComplete || disabled}
          onClick={() => onSubmit(code)}
        >
          <LuPackageSearch /> Track Order
        </Button>
      </div>
  );
}
