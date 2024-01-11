export function getPageNumbers(totalPage: number, currentPage: number) {
  if (totalPage <= 3) {
    return Array.from({ length: totalPage }, (_, i) => i + 1);
  }

  const startPage = Math.max(1, Math.min(currentPage - 1, totalPage - 2));
  const endPage = Math.min(totalPage, startPage + 2);

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );
}
