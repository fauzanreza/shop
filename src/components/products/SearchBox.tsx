"use client";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <div className="relative mb-6">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="搜尋商品..."
        aria-label="搜尋商品"
        className="w-full rounded-md border border-neutral-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
      />
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">🔍</span>
    </div>
  );
}
