import { Request, Response, NextFunction } from "express";

const WhiteList = ["/login"];

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const { url } = req;
  if (!url) {
    return next();
  }
  const token = req.headers.authorization;
  if (!token && !WhiteList.includes(url)) {
    res.json({
      status: 0,
      message: "token is required",
      data: {},
    });

    return Promise.resolve();
  }
  return next();
}
