import { Controller, Post, Body, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AppService } from "./app.service";
import { isPlainObject } from "./helper";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/login")
  login(@Body() body: any) {
    return this.appService.resSuc({
      token: "TEST_TOKEN",
      ...(isPlainObject(body) ? body : {}),
    });
  }

  @Post("/user/info")
  getUser() {
    return this.appService.resSuc({
      userId: 100,
      username: "TEST_USERNAME",
      avatar: "https://s2.loli.net/2023/01/12/a4ImQMsgHkbxtJL.jpg",
    });
  }

  @Post("/tool/upimg")
  @UseInterceptors(FileInterceptor("file"))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  upimg(@UploadedFile() file: Express.Multer.File) {
    return this.appService.resSuc({
      url: "https://s2.loli.net/2023/01/12/a4ImQMsgHkbxtJL.jpg",
      width: 200,
      height: 200,
    });
  }
}
