import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/db"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { db } = await connectToDatabase();

    const checkForCookieExist = () => {
        // if()
    }

    let result = checkForCookieExist();

    const data = await db.collection("users").find({}).toArray();

    res.status(200).json({ success: true, data: data });
  } catch (error: any) {
    console.log(`>>>>ERROR:`, error.message);
  }
}
