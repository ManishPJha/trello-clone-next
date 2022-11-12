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
          email: isValidToken.email,
          isValidated: true,
        };
      } else {
        return {
          isValidated: false,
        };
      }
    } else {
      return {
        isValidated: false,
      };
    }
  } catch (error: any) {
    console.log(">>>ERROR:", error.message);
  }
}
