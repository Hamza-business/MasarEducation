'use client';

import { useEffect, useState } from 'react';

const locales = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'tk', label: 'Türkmençe' }
];

export default function LanguageSwitcher() {
  const [selected, setSelected] = useState('en');

  useEffect(() => {
    const stored = localStorage.getItem('locale');
    if (stored) setSelected(stored);
  }, []);

  const handleChange = (locale: string) => {
    localStorage.setItem('locale', locale);
    document.cookie = `locale=${locale}; path=/`;
    window.location.reload();
  };

  return (
    <select
      value={selected}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-md border p-2 dark:bg-zinc-900"
    >
      {locales.map(({ code, label }) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
}
