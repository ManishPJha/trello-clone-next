import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/db";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { db } = await connectToDatabase();

  if (req.method === "GET") {
    const { id } = req.query;

    // const columns = await db
    //   .collection("column")
    //   .find({ boardId: id })
    //   .toArray();

    const columns = await db
      .collection("column")
      .aggregate([
        {
          $lookup: {
            from: "board",
            localField: "boardId",
            foreignField: "boardId",
            as: "filteredWithBoardId",
          },
        },
        {
          $unwind: "$filteredWithBoardId",
        },
        {
          $match: {
            boardId: id,
          },
        },
        {
          $sort: {
            sequence: 1,
          },
        },
      ])
      .toArray();

    return new Promise((resolve, reject) => {
      try {
        if (columns) {
          res.status(201).json({
            success: true,
            message: `record fetched successfully.`,
            data: columns,
          });
          resolve(columns);
          return;
        }
        res.status(200).json({
          success: false,
          message: `no record found with this id!`,
        });
        resolve();
        return;
      } catch (error: any) {
        console.log(`>>>ERROR:`, error.message);
        reject(error.message);
      }
    });
  } else {
    res.status(405).json({
      error: "wrong method!",
    });
  }
};

export default handler;
