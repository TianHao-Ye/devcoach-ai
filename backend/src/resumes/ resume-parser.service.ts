import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { readFile } from 'fs/promises';
import * as mammoth from 'mammoth';
import { PDFParse } from 'pdf-parse';

@Injectable()
export class ResumeParserService {
  async extractText(file: Express.Multer.File): Promise<string> {
    const buffer = await readFile(file.path);

    switch (file.mimetype) {
      case 'application/pdf':
        return this.extractPdfText(buffer);

      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return this.extractDocxText(buffer);

      default:
        throw new UnsupportedMediaTypeException('Unsupported resume file type');
    }
  }

  private async extractPdfText(buffer: Buffer): Promise<string> {
    const parser = new PDFParse({
      data: buffer,
    });

    try {
      const result = await parser.getText();

      return this.cleanText(result.text);
    } finally {
      await parser.destroy();
    }
  }

  private async extractDocxText(buffer: Buffer): Promise<string> {
    const result = await mammoth.extractRawText({
      buffer,
    });

    return this.cleanText(result.value);
  }

  private cleanText(text: string): string {
    return text
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }
}
