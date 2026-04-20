export function capitalizeTuple<
  T extends readonly string[]
>(arr: T): { [K in keyof T]: Capitalize<T[K]> } {
  const out = arr.map((s) =>
    s.length ? (s[0].toUpperCase() + s.slice(1)) : s
  );
  // Cast is safe because we transform each element to its Capitalize<> form.
  return out as { [K in keyof T]: Capitalize<T[K]> };
};

export function toTitleCase(s: string) {
  const out = s.replace(/\b\w/g, (c)=> c.toUpperCase());
  return out
};