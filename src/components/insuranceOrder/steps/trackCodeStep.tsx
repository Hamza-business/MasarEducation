"use client";

import { Button } from "@/components/ui/button";
import { FiCopy } from "react-icons/fi";
import { useState } from "react";
import { TbProgressCheck } from "react-icons/tb";
import { FaLocationArrow } from "react-icons/fa";
import {useTranslations} from 'next-intl';

type Props = {
  trackCode:string;
};

export default function TrackCodeStep({
  trackCode
}: Props) {
  const t = useTranslations("track");
  const [copied, setCopied] = useState(false);

  return (
      <div className="mt-10 p-6 border border-blue-400 bg-blue-50 dark:bg-gray-900 dark:border-blue-400 rounded-sm text-center shadow-sm space-y-4 w-full mx-auto">
          <h2 className="text-2xl font-semibold">
            {t("succsub")}
          </h2>
          <p className="text-xl px-4 font-semibold">
            {t("thiso")}
          </p>

          <div className="flex justify-center items-center gap-3">
            <div className="text-5xl font-mono font-bold tracking-widest text-blue-600 dark:text-blue-500">{trackCode}</div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(trackCode);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              title="Copy to clipboard"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              <FiCopy className="w-6 h-6" />
            </button>
          </div>

          {copied && (
            <p className="text-sm text-blue-600">{t("copied")}</p>
          )}

          <p className="text-base px-4">
            {t("keep")}
          </p>

          <Button className="text-base px-5 py-6 mt-2">
              <a href={`/insurance/track?code=${trackCode}`} className="flex justify-between items-center gap-2 h-18 w-full">
                <TbProgressCheck /> {t("trcl")} <FaLocationArrow />
              </a>
          </Button>
      </div>
  );
}
