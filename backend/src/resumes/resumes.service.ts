import { Injectable, NotFoundException } from '@nestjs/common';
import type { Resume } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { join } from 'path';
import { unlink } from 'fs/promises';

@Injectable()
export class ResumesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, file: Express.Multer.File): Promise<Resume> {
    return this.prisma.resume.create({
      data: {
        originalName: file.originalname,
        fileName: file.filename,
        mimeType: file.mimetype,
        size: file.size,
        userId,
      },
    });
  }

  async findAll(userId: string): Promise<Resume[]> {
    return this.prisma.resume.findMany({
      where: {
        userId,
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
}
