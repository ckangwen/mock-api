import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AuthMiddleware } from "./app.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix("mock-api");
  app.use(AuthMiddleware);
  await app.listen(3000);
}
bootstrap();
