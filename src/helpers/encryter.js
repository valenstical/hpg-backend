export const charCode = (id) => String(id).split('').map((i) => String(i).charCodeAt(0)).join('A');

export const encode = (id) => {
  const res = (3 * +id) + String(id).split('').reduce((a, b) => +a + +b);
  return `${charCode(res)}B${charCode(id)}`;
};
