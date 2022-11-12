import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/db";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { db } = await connectToDatabase();

    const data = await db.collection("users").find({}).toArray();

    console.log(`--->`, req.query, `--->`, data);

    res.status(200).json({ success: true, data: data });
  } catch (error: any) {
    console.log(`>>>>ERROR:`, error.message);
  }
}
