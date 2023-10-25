import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

const globalPrefix = 'api';
const versionPrefix = 'v';
const defaultVersion = '1';

export const getApp = async () => {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  // prefix
  app.setGlobalPrefix(globalPrefix);

  // versioning
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: versionPrefix,
    defaultVersion: defaultVersion,
  });

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001', // 로컬 주소
      'http://amass-admin-frontend.koreacentral.cloudapp.azure.com', // 배포된 프론트엔드 도메인
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  return app;
};

async function bootstrap() {
  const app = await getApp();
  const port = 4000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}/${versionPrefix}${defaultVersion}`,
  );
}

// 로컬 개발환경 경우만 실행
if (process.env.NODE_ENV === 'development') {
  bootstrap();
}
