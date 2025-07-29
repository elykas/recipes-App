
const MAX_EXCLUDES_ID = 100;
export const getRandomItems = <T,>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const trimExcludesId = (excludesId: string[]): string[] => {
  if (excludesId.length > MAX_EXCLUDES_ID) {
    return excludesId.slice(excludesId.length - MAX_EXCLUDES_ID);
  }
  return excludesId;
}

export const encodeCursor = (data: object): string => {
  return Buffer.from(JSON.stringify(data)).toString("base64");
};

export const decodeCursor = (cursor: string): any => {
  const obj = JSON.parse(Buffer.from(cursor, "base64").toString("utf-8"));
  if (obj.newestPostCursor?.createdAt) {
    obj.newestPostCursor.createdAt = new Date(obj.newestPostCursor.createdAt);
  }
  if (obj.withRecipePostCursor?.createdAt) {
    obj.withRecipePostCursor.createdAt = new Date(obj.withRecipePostCursor.createdAt);
  }
  return obj;
};