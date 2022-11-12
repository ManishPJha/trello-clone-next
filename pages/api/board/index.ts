import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/db";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { db } = await connectToDatabase();

    const boards = await db.collection("board").find({}).toArray();

    const totalBoards = await db.collection("board").find({}).count();

    if (boards && boards.length > 0) {
      res.status(200).json({
        success: true,
        data: boards,
        message: "Number of boards are : " + Number(totalBoards),
      });
      return;
    }

    res.status(200).json({
      success: false,
      message: "Collection is empty!",
    });
    return;
  } catch (error: any) {
    console.log(`>>>ERROR:`, error.message);
  }
};

export default handler;
