import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Req,
  BadRequestException,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import type { Request } from 'express';

import { ResumesService } from './resumes.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@Controller('resumes')
//controller level guard
@UseGuards(JwtAuthGuard)
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post()
  @UseInterceptors(
    // Nest provides a built-in module based on the multer middleware package for Express. Multer handles data posted in the multipart/form-data format,
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/resumes',
        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;

          callback(null, uniqueName);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];

        if (!allowedMimeTypes.includes(file.mimetype)) {
          return callback(
            new BadRequestException('Only PDF and DOCX files are allowed'),
            false,
          );
        }

        callback(null, true);
      },
    }),
  )
  uploadResume(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: AuthenticatedRequest,
  ) {
    if (!file) {
      throw new BadRequestException('Resume file is required');
    }

    return this.resumesService.create(request.user.userId, file);
  }

  @Get()
  findAll(@Req() request: AuthenticatedRequest) {
    return this.resumesService.findAll(request.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.resumesService.findOne(request.user.userId, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.resumesService.remove(request.user.userId, id);
  }
}
