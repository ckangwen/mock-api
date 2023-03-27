import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AuthMiddleware } from "./app.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix("mock-api");
  app.use(AuthMiddleware);
  await app.listen(8010);
}
bootstrap();
