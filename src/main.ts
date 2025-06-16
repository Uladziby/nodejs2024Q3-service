import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from 'src/swagger/swagger-config';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      strictGroups: true,
    }),
  );
  await setupSwagger(app);

  await app.listen(PORT, () =>
    console.log(`Server started at http://localhost:${PORT}`),
  );
}
bootstrap();
