import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Resume } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { join } from 'path';
import { unlink } from 'fs/promises';
import { ResumeParserService } from './ resume-parser.service';
import { AiService } from 'src/ai/ai.service';

@Injectable()
export class ResumesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly resumeParser: ResumeParserService,
    private readonly aiService: AiService,
  ) {}

  async create(userId: string, file: Express.Multer.File): Promise<Resume> {
    // if content extration fail or file data fail write into database, then delete file from backend disk storage
    try {
      const fileContent = await this.resumeParser.extractText(file);

      return this.prisma.resume.create({
        data: {
          originalName: file.originalname,
          fileName: file.filename,
          mimeType: file.mimetype,
          size: file.size,
          content: fileContent,
          userId,
        },
      });
    } catch (error) {
      // if file deletion on backend disk fail, do not throw deletion fail info
      await unlink(file.path).catch(() => undefined);

      throw error;
    }
  }

  async findAll(userId: string) {
    return this.prisma.resume.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        originalName: true,
        fileName: true,
        mimeType: true,
        size: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(userId: string, resumeId: string): Promise<Resume> {
    const resume = await this.prisma.resume.findFirst({
      where: {
        id: resumeId,
        userId,
      },
    });
    if (!resume) {
      throw new NotFoundException('Resume not found');
    }

    return resume;
  }

  async remove(userId: string, resumeId: string) {
    const resume = await this.findOne(userId, resumeId);

    // delete file meta data from database
    await this.prisma.resume.delete({
      where: {
        id: resume.id,
      },
    });

    // delete actual file
    const filePath = join(process.cwd(), 'uploads', 'resumes', resume.fileName);

    try {
      await unlink(filePath);
    } catch {
      // File may already be missing.
      // Database deletion should still succeed.
    }

    return {
      message: 'Resume deleted successfully',
    };
  }

  async analyze(userId: string, resumeId: string) {
    const resume = await this.findOne(userId, resumeId);

    if (!resume.content) {
      throw new BadRequestException('Resume content is not available');
    }

    return this.aiService.analyzeResume(resume.content);
  }
}
