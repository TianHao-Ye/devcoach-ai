import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CreateInterviewDto } from './dto/create-interview.dto';
import { InterviewsService } from './interviews.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@Controller('interviews')
@UseGuards(JwtAuthGuard)
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  @Post()
  create(
    @Body() dto: CreateInterviewDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.interviewsService.create(request.user.userId, dto);
  }

  @Get()
  findAll(@Req() request: AuthenticatedRequest) {
    return this.interviewsService.findAll(request.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.interviewsService.findOne(request.user.userId, id);
  }

  @Post(':id/questions/generate')
  generateQuestions(
    @Param('id') id: string,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.interviewsService.generateQuestions(request.user.userId, id);
  }

  @Get(':id/questions')
  findQuestions(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.interviewsService.findQuestions(request.user.userId, id);
  }
}
