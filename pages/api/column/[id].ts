import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/db";
import moment from "moment";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { db } = await connectToDatabase();
  const { id } = req.query;

  if (req.method === "POST") {
    const column = await db.collection("column").insertOne({
      ...req.body,
      createdAt: moment(new Date()).format(),
      updatedAt: moment(new Date()).format(),
    });

    return new Promise((resolve, reject) => {
      try {
        if (column) {
          res.status(201).json({
            success: true,
            message: `column id - ${id} is created successfully.`,
            data: column,
          });
          resolve();
          return;
        }
        res.status(200).json({
          success: false,
          message: `column is not created.`,
        });
        resolve();
        return;
      } catch (error: any) {
        console.log(`>>>ERROR:`, error.message);
      }
    });
  } else if (req.method === "PUT") {
    return new Promise(async (resolve, reject) => {
      try {
        const isExist = await db.collection("column").findOne({
          columnId: id,
        });

        if (isExist) {
          const column = await db.collection("column").updateOne(
            {
              columnId: id,
            },
            {
              $set: {
                ...req.body,
                updatedAt: moment(new Date()).format(),
              },
            },
            {
              upsert: true,
            }
          );

          res.status(200).json({
            success: true,
            data: column,
            message: "column updated successfully.",
          });
          resolve(column);
          return;
        } else {
          res.status(404).json({
            success: false,
            message: "no record found with given id!",
          });
          return;
        }
      } catch (error: any) {
        console.log(`>>>ERROR:`, error.message);
        reject(error.message);
      }
    });
  } else {
    res.status(405).json({
      error: "invalid request method!",
    });
  }
};

export default handler;
