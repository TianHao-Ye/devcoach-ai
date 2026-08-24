import { Injectable } from '@nestjs/common';
import { ResumeAnalysis } from './types/resume-analysis';

@Injectable()
export class AiService {
  async analyzeResume(content: string): Promise<ResumeAnalysis> {
    return {
      summary: 'Resume analysis placeholder',
      skills: [],
      strengths: [],
      gaps: [],
      suggestedRoles: [],
    };
  }
}
