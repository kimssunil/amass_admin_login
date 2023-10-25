import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

const globalPrefix = 'api';
const versionPrefix = 'v';
const defaultVersion = '1';

export const getApp = async () => {
  const app = await NestFactory.create(AppModule);
  console.log('app', app);
  // security
  app.use(helmet());

  // prefix
  app.setGlobalPrefix(globalPrefix);

  // versioning
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: versionPrefix,
    defaultVersion: defaultVersion,
  });

  return app;
};

async function bootstrap() {
  const app = await getApp();
  const port = process.env.PORT || 4000;
  console.log('port', port);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}/${versionPrefix}${defaultVersion}`,
  );
}

// 로컬 개발환경 경우만 실행
if (process.env.NODE_ENV === 'development') {
  bootstrap();
}
