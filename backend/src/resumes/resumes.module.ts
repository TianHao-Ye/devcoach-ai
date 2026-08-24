import { Module } from '@nestjs/common';
import { ResumesController } from './resumes.controller';
import { ResumesService } from './resumes.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ResumeParserService } from './ resume-parser.service';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports: [PrismaModule, AiModule],
  controllers: [ResumesController],
  providers: [ResumesService, ResumeParserService],
})
export class ResumesModule {}
