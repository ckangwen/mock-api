import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  resSuc(data: any, message = "success") {
    return {
      status: 1,
      message,
      data,
    };
  }
}
