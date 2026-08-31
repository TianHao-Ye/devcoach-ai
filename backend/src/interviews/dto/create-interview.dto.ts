import { IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateInterviewDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  targetRole: string;

  @IsOptional()
  @IsString()
  jobDescription?: string;

  @IsOptional()
  @IsUUID()
  resumeId?: string;
}
