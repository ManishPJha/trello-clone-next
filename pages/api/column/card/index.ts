import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/db";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { db } = await connectToDatabase();

  if (req.method === "GET") {
    return new Promise(async (resolve, reject) => {
      const cards = await db
        .collection("cards")
        .aggregate([
          {
            $lookup: {
              from: "board",
              localField: "boardId",
              foreignField: "_id",
              as: "innerBoardData",
            },
          },
          {
            $lookup: {
              from: "column",
              localField: "columnId",
              foreignField: "_id",
              as: "innerColumnData",
            },
          },
          {
            $unwind: "$innerBoardData",
          },
          {
            $unwind: "$innerColumnData",
          },
          {
            $project: {
              boardId: 0,
              columnId: 0,
              innerBoardData: {
                boardId: 0,
                backgroundImage: 0,
                createdAt: 0,
                updatedAt: 0,
              },
              innerColumnData: {
                columnId: 0,
                boardId: 0,
                userId: 0,
                createdAt: 0,
                updatedAt: 0,
              },
            },
          },
        ])
        .toArray();

      if (cards && !(cards.length > 0)) {
        res.status(200).json({
          success: false,
          message: "no records found with requested id!",
        });
        return;
      }

      res.status(200).json({
        sucess: true,
        data: cards,
        message: "total fetched records are " + cards.length,
      });
    });
  } else {
    res.status(405).json({
      error: "invalid request method!",
    });
  }
};

export default handler;
