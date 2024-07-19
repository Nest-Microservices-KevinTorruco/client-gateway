import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {

  const logger = new Logger('Main-GateWay')
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true
    }),
  )

  //Agregar custom Filter
  app.useGlobalFilters(new RpcCustomExceptionFilter)

  await app.listen(envs.port)

  logger.log (`GateWay running on port ${envs.port}`);

}
bootstrap();
