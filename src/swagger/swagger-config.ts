import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { parse } from 'yamljs';
import 'dotenv/config';

export const setupSwagger = async (app: INestApplication) => {
  const swaggerPath = resolve(__dirname, '../../doc/api.yaml');
  const swaggerContents = await readFile(swaggerPath, 'utf-8');
  const swaggerConfig = parse(swaggerContents);

  SwaggerModule.setup('doc', app, swaggerConfig);
};
