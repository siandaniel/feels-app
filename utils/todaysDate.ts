export const todaysDate = new Date()
    .toISOString()
    .slice(0, 10)
    .split("-")
    .reverse()
    .join("/");