export const getPageNumbers = (totalPage: number, currentPage: number) => {
  for (let i = 1; i <= totalPage; i += 3) {
    const range = [];

    for (let j = i; j <= Math.min(i + 2, totalPage); j++) {
      range.push(j);
    }

    if (range.includes(currentPage)) {
      return range;
    }
  }

  return [];
};
