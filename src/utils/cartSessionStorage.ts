export const generateMockToken = () => {
  const rand = Math.random().toString(36).substring(2);
  const time = Date.now().toString(36);
  return btoa(rand + time);
};
