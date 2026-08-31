import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AiService } from './ai.service';

describe('AiService', () => {
  let service: AiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'USE_MOCK_AI') return 'true';
              return undefined;
            }),
            getOrThrow: jest.fn(() => 'ollama'),
          },
        },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('generates mock interview questions', async () => {
    const questions = await service.generateInterviewQuestions({
      targetRole: 'Backend Engineer',
    });

    expect(questions).toHaveLength(8);
    expect(questions[0]).toEqual(
      expect.objectContaining({
        question: expect.any(String) as string,
        category: expect.any(String) as string,
      }),
    );
  });
});
