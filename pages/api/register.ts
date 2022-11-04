import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import moment from "moment";

import { connectToDatabase } from "@/utils/db";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
): Promise<void> => {
  try {
    if (req.method === "POST") {
      let salt = 10;
      const { db, client } = await connectToDatabase();
      const { firstName, lastName, email, password } = req.body;

      const encryptPassword = async (password: string) => {
        const hash = await bcrypt.hash(password, salt);

        return hash;
      };

      let data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: await encryptPassword(password),
        resetToken: null,
        resetTokenExpiryTime: null,
        createdAt: moment(new Date()).format(),
        updatedAt: moment(new Date()).format(),
      };

      const response = await db.collection("users").insertOne(data);

      return new Promise((resolve, reject) => {
        try {
          if (response) {
            res.status(201).json({
              success: true,
              data: response,
              message: "User registered successfully.",
            });
            resolve();
            return;
          }
          res.status(404).json({
            success: false,
            message: "User registeration failed.",
          });
        } catch (error: any) {
          console.log("API Error >>>>>>", error.message);
          resolve();
          res.status(405).end();
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
