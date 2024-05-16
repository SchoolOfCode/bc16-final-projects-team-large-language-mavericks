// import fs from 'fs/promises';
import { promises as fs } from 'fs';
import path from 'path';

export async function readMarkdownFile(filePath: string): Promise<string> {
  const fullPath = path.join(process.cwd(), filePath);
  const fileContent = await fs.readFile(fullPath, 'utf8');
  return fileContent;
}
