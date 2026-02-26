export function reorder<T>(list: T[], from: number, to: number): T[] {
  const updated = [...list];

  const [item] = updated.splice(from, 1);

  updated.splice(to, 0, item);

  return updated;
}
