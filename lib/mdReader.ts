import * as fs from 'fs';
import * as path from 'path';
export function readMarkdownFile(filePath: string): string {
    const fullPath = path.join(process.cwd(), filePath);
    const data = fs.readFileSync(fullPath, { encoding: 'utf8', flag: 'r' });
    return data   
}

