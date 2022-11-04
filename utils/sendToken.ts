import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

type userType = {
  _id: ObjectId;
  email: string;
};

export const sendToken = (user: any = null) => {
  if (user) {
    let userData: userType = { ...user };
    let tokenData = { id: userData._id, email: userData.email };

    let token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    return token;
  }
  return;
};
