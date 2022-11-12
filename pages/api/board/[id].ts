import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/db";
import moment from "moment";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { db } = await connectToDatabase();

    if (req.method === "POST") {
      const { id } = req.query;

      const board = await db.collection("board").insertOne({
        boardId: id,
        boardName: req.body.name,
        backgroundImage: req.body.image,
        createdAt: moment(new Date()).format(),
        updatedAt: moment(new Date()).format(),
      });

      return new Promise((resolve, reject) => {
        try {
          if (board) {
            res.status(201).json({
              success: true,
              message: `board id - ${id} is created successfully.`,
              data: board,
            });
            resolve();
            return;
          }
          res.status(200).json({
            success: false,
            message: `board is not created.`,
          });
          resolve();
          return;
        } catch (error: any) {
          console.log(`>>>ERROR:`, error.message);
        }
      });
    } else if (req.method === "GET") {
      const { id } = req.query;

      const board = await db.collection("board").findOne({ boardId: id });

      return new Promise((resolve, reject) => {
        try {
          if (board) {
            res.status(201).json({
              success: true,
              message: `record fetched successfully.`,
              data: board,
            });
            resolve();
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
        }
      });
    } else {
      res.status(405).json({
        error: "wrong method!",
      });
    }
  } catch (error: any) {
    console.log(`>>>ERROR:`, error.message);
  }
};

export default handler;
