import { Injectable } from '@nestjs/common';
import { ResumeAnalysis, resumeAnalysisSchema } from './types/resume-analysis';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
  private readonly openai: OpenAI;
  private readonly model: string;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.getOrThrow<string>('OPENAI_API_KEY'),
      baseURL:
        this.configService.get<string>('OPENAI_BASE_URL') ??
        'http://127.0.0.1:11434/v1',
    });

    this.model =
      this.configService.get<string>('OPENAI_MODEL') ?? 'deepseek-r1:8b';
  }

  async analyzeResume(content: string): Promise<ResumeAnalysis> {
    if (process.env.USE_MOCK_AI === 'true') {
      return {
        summary: 'Mock resume analysis',
        skills: ['TypeScript'],
        strengths: ['Backend development'],
        gaps: [],
        suggestedRoles: ['Junior Software Engineer'],
      };
    }

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        {
          role: 'system',
          content: `
You are an experienced technical recruiter and software engineering career coach.

Analyze the provided resume objectively.
Do not invent experience or skills that are not present.
Return only valid JSON.
      `,
        },
        {
          role: 'user',
          content,
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'resume_analysis',
          strict: true,
          schema: {
            type: 'object',
            properties: {
              summary: {
                type: 'string',
              },
              skills: {
                type: 'array',
                items: { type: 'string' },
              },
              strengths: {
                type: 'array',
                items: { type: 'string' },
              },
              gaps: {
                type: 'array',
                items: { type: 'string' },
              },
              suggestedRoles: {
                type: 'array',
                items: { type: 'string' },
              },
            },
            required: [
              'summary',
              'skills',
              'strengths',
              'gaps',
              'suggestedRoles',
            ],
            additionalProperties: false,
          },
        },
      },
    });

    //     const response = await this.openai.responses.create({
    //       model: this.model,

    //       instructions: `
    // You are an experienced technical recruiter and software engineering career coach.

    // Analyze the provided resume objectively.

    // Focus on:
    // - technical skills
    // - demonstrated strengths
    // - missing or weak areas
    // - realistic software engineering roles

    // Do not invent experience or skills that are not present in the resume.
    // `,

    //       input: content,

    //       text: {
    //         format: {
    //           type: 'json_schema',
    //           name: 'resume_analysis',
    //           strict: true,
    //           schema: {
    //             type: 'object',
    //             properties: {
    //               summary: {
    //                 type: 'string',
    //               },

    //               skills: {
    //                 type: 'array',
    //                 items: {
    //                   type: 'string',
    //                 },
    //               },

    //               strengths: {
    //                 type: 'array',
    //                 items: {
    //                   type: 'string',
    //                 },
    //               },

    //               gaps: {
    //                 type: 'array',
    //                 items: {
    //                   type: 'string',
    //                 },
    //               },

    //               suggestedRoles: {
    //                 type: 'array',
    //                 items: {
    //                   type: 'string',
    //                 },
    //               },
    //             },

    //             required: [
    //               'summary',
    //               'skills',
    //               'strengths',
    //               'gaps',
    //               'suggestedRoles',
    //             ],

    //             additionalProperties: false,
    //           },
    //         },
    //       },
    //     });

    // const parsed = JSON.parse(response.output_text);

    const output = response.choices[0]?.message.content;

    if (!output) {
      throw new Error('Local model returned no content');
    }

    const parsed: unknown = JSON.parse(output);

    return resumeAnalysisSchema.parse(parsed);
  }
}
