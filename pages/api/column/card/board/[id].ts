import { NextApiRequest, NextApiResponse } from "next";
import moment from "moment";
import { connectToDatabase } from "@/utils/db";
import { ObjectId } from "mongodb";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { db } = await connectToDatabase();

  const boardId = req.query.id;

  if (req.method === "GET") {
    return new Promise(async (resolve, reject) => {
      const isMatched = await db.collection("board").findOne({
        boardId: boardId,
      });

      if (!isMatched) {
        res.status(200).json({
          success: false,
          message: "no records found with requested id!",
        });
        return;
      }

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
            $match: {
              boardId: isMatched._id,
            },
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

      console.log(cards);

      res.status(200).json({
        sucess: true,
        data: cards,
        message: "records fetched successfully.",
      });
    });
  } else {
    res.status(405).json({
      error: "invalid request method!",
    });
  }
};

export default handler;
