import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { AiService } from 'src/ai/ai.service';

@Injectable()
export class InterviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
  ) {}

  async create(userId: string, dto: CreateInterviewDto) {
    if (dto.resumeId) {
      const resume = await this.prisma.resume.findFirst({
        where: {
          id: dto.resumeId,
          userId,
        },
      });

      if (!resume) {
        throw new NotFoundException('Resume not found');
      }
    }

    return this.prisma.interview.create({
      data: {
        title: dto.title,
        targetRole: dto.targetRole,
        jobDescription: dto.jobDescription,
        resumeId: dto.resumeId,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.interview.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(userId: string, interviewId: string) {
    const interview = await this.prisma.interview.findFirst({
      where: {
        id: interviewId,
        userId,
      },
    });

    if (!interview) {
      throw new NotFoundException('Interview not found');
    }

    return interview;
  }

  async generateQuestions(userId: string, interviewId: string) {
    const interview = await this.prisma.interview.findFirst({
      where: {
        id: interviewId,
        userId,
      },
      include: {
        resume: true,
      },
    });

    if (!interview) {
      throw new NotFoundException('Interview not found');
    }

    const questions = await this.aiService.generateInterviewQuestions({
      targetRole: interview.targetRole,
      jobDescription: interview.jobDescription ?? undefined,
      resumeContent: interview.resume?.content ?? undefined,
    });

    await this.prisma.interviewQuestion.deleteMany({
      where: {
        interviewId,
      },
    });

    await this.prisma.interviewQuestion.createMany({
      data: questions.map((question, index) => ({
        interviewId,
        question: question.question,
        category: question.category,
        order: index + 1,
      })),
    });

    return this.prisma.interviewQuestion.findMany({
      where: {
        interviewId,
      },
      orderBy: {
        order: 'asc',
      },
    });
  }

  async findQuestions(userId: string, interviewId: string) {
    await this.findOne(userId, interviewId);

    return this.prisma.interviewQuestion.findMany({
      where: {
        interviewId,
      },
      orderBy: {
        order: 'asc',
      },
    });
  }
}
