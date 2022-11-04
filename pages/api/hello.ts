import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/db";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { client, db } = await connectToDatabase();

    // For V3 Mongodb approach
    // if (client.isConnected()) {
    //   const data = await db.collection("employees").findOne({name: "Samay"});
    //   console.log(`----------------`, data);
    // }

    const data = await db.collection("employees").find({}).toArray();

    res.status(200).json({ ...data });
  } catch (error: any) {
    console.log(`>>>>ERROR:`, error.message);
  }
}
