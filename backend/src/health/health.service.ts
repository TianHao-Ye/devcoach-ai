import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHealth() {
    return {
      status: 'ok',
      service: 'DevCoach API',
      version: '1.0.0',
      timestamp: '2026-07-30T...',
    };
  }
}
