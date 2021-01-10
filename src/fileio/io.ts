import fs from 'fs';

export const fileName = 'notes.md';

export const writeMarkdownToFile = async (content: string) => {
  await fs.writeFile(fileName, content, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

export const writeMarkdownToFileWithPath = async (
  content: string,
  filePath: string
) => {
  await fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

export const readMarkdownFromFile = async (): Promise<string | void> => {
  const contentPromise: Promise<string | void> = new Promise(
    (resolve, reject) => {
      fs.readFile(
        fileName,
        'utf8',
        (err: NodeJS.ErrnoException | null, data: string) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          resolve(data);
        }
      );
    }
  );
  return contentPromise;
};
