import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import cookie from "cookie";

import { connectToDatabase } from "@/utils/db";
import { sendToken } from "@/utils/sendToken";

const CompareHashPasswords = (password: string, db_password: string) => {
  try {
    const isMatched = bcrypt.compare(password, db_password);
    return isMatched;
  } catch (error: any) {
    console.log(`>>>ERROR:`, error.message);
  }
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
): Promise<void> => {
  try {
    const { db } = await connectToDatabase();

    if (req.method === "POST") {
      const { email, password } = req.body;

      const isUser = await db.collection("users").findOne({
        email: email,
      });

      return new Promise(async (resolve, reject) => {
        try {
          if (isUser) {
            const isMatched = await CompareHashPasswords(
              password,
              isUser.password
            );
            if (isMatched) {
              let token = sendToken(isUser);

              res.setHeader(
                "Set-Cookie",
                cookie.serialize("oneway-token", token!, {
                  // secure: process.env.NODE_ENV === "development" ? false : true,
                  secure: true,
                  httpOnly: true,
                  sameSite: "none",
                  path: "/",
                  expires: new Date(
                    Date.now() +
                      Number(process.env.COOKIE_EXPIRY) * 24 * 3600 * 1000
                  ),
                })
              );

              res.status(200).json({
                success: true,
                message: "Login successfull.",
                data: {
                  id: isUser._id,
                  email: isUser.email
                }
              });

              resolve();
              return;
            }

            res.status(401).json({
              success: false,
              message: "Unauthorized request.",
            });
            resolve();
            return;
          }
          res.status(404).json({
            success: false,
            message: "No user registered with this email.",
          });

          resolve();
          return;
        } catch (error: any) {
          console.log(`>>>ERROR:`, error.message);
          resolve();
        }
      });
    }
  } catch (error: any) {
    res.status(401).json({
      success: false,
      error: error,
    });
  }
};

export default handler;
