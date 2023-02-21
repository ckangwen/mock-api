import { Controller, Post, Body, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AppService } from "./app.service";
import { isPlainObject } from "./helper";
import axios from "axios";

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

  @Post("/user/list")
  async getUsers(@Body() body: { page?: number; limit?: number }) {
    const total = 100;
    const limit = body.limit || 10;
    const page = Math.min(body.page || 1, Math.ceil(total / limit));

    const response = await axios.request({
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/posts",
    });
    try {
      const list = response.data;

      return {
        data: {
          page,
          total: 100,
          list: list.slice((page - 1) * limit, page * limit),
        },
        message: "Success",
        status: 1,
      };
    } catch (e) {
      return {
        data: {
          page: 0,
          total: 0,
          list: [],
        },
        message: "Fail",
        status: 0,
      };
    }
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
