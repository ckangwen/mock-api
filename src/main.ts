import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AuthMiddleware } from "./app.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("mock-api");
  app.use(AuthMiddleware);
  app.enableCors({
    origin: "*",
  });
  await app.listen(3000);
}
bootstrap();
