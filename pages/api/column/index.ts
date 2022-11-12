import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/db";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { db } = await connectToDatabase();

    if (req.method === "GET") {
      const columns = await db.collection("column").find({}).toArray();
      const totalColumns = await db.collection("column").find({}).count();

      return new Promise((resolve, reject) => {
        if (columns) {
          res.status(200).json({
            success: true,
            data: columns,
            count: totalColumns,
            message: `${
              totalColumns > 1
                ? totalColumns + " " + "columns"
                : totalColumns + " " + "column"
            } fetched successfully.`,
          });
          resolve();
          return;
        } else {
          res.status(200).json({
            success: false,
            message: "collection is empty!",
          });
          resolve();
          return;
        }
      });
    } else {
      res.status(405).json({
        error: "invalid request method!",
      });
    }
  } catch (error: any) {
    console.log(`>>>ERROR:`, error.message);
  }
};

export default handler;
