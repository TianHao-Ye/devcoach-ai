import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  //prevent cors local dev cors error
  app.enableCors({
    origin: 'http://localhost:3000',
    // Allows credentialed browser requests from above origin, frontend need to define 'withCredentials: true'
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
