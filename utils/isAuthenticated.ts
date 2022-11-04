import { API } from "./API";
import jwt from "jsonwebtoken";
import cookies from "cookie";

export default async function isAuthenticated(ctx: any) {
  try {
    if (ctx.req && ctx.req.headers && ctx.req.headers.cookie) {
      let cookie = cookies.parse(ctx.req.headers.cookie);
      let token = cookie["oneway-token"];

      let isValidToken: any = jwt.verify(token, process.env.JWT_SECRET!);

      if (isValidToken.email) {
        return {
          id: isValidToken.id,
          isValidated: true,
          isAuthenticated: true,
        };
      } else {
        return {
          isValidated: false,
          isAuthenticated: false,
        };
      }
    } else {
      return {
        isValidated: false,
        isAuthenticated: false,
      };
    }
  } catch (error: any) {
    console.log(">>>ERROR:", error.message);
  }
}
