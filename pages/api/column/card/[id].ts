import { NextApiRequest, NextApiResponse } from "next";
import moment from "moment";
import { connectToDatabase } from "@/utils/db";
import { ObjectId } from "mongodb";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { db } = await connectToDatabase();

  const cardId = req.query.id;

  const isMatched =
    !req.method?.includes("POST") &&
    (await db.collection("cards").findOne({
      cardId: cardId,
    }));

  if (req.method === "POST") {
    const data = {
      cardId: cardId,
      columnId: new ObjectId(req.body.columnId),
      boardId: new ObjectId(req.body.boardId),
      name: req.body.cardName || undefined,
      index: req.body.index,
      createdAt: moment(new Date()).format(),
      updatedAt: moment(new Date()).format(),
    };

    return new Promise(async (resolve, reject) => {
      try {
        const card = await db.collection("cards").insertOne(data);

        if (card) {
          res.status(201).json({
            success: true,
            message: `card is created successfully with id ${card.insertedId}.`,
          });
          resolve(card);
          return;
        } else {
          res.status(200).json({
            success: false,
            message: `request failed!.`,
          });
          return;
        }
      } catch (error: any) {
        console.log(">>>ERROR:", error.message);
        reject(error.message);
      }
    });
  } else if (req.method === "GET") {
    if (!isMatched) {
      res.status(200).json({
        success: false,
        message: "no records found with requested id!",
      });
      return;
    }

    return new Promise(async (resolve, reject) => {
      res.status(200).json({
        sucess: true,
        data: isMatched,
        message: "records fetched successfully.",
      });
    });
  } else if (req.method === "PUT") {
    if (!isMatched) {
      res.status(200).json({
        success: false,
        message: "no records found with requested id!",
      });
      return;
    }

    return new Promise(async (resolve, reject) => {
      const { destCardId, sourceCard, destinationCard } = req.body;

      const updateSourceCardSequence = async (cardId: string) => {
        const card = await db.collection("cards").updateOne(
          {
            cardId,
          },
          {
            $set: {
              index: destinationCard.index,
            },
          },
          {
            upsert: true,
          }
        );
      };
      const updateDestinationCardSequence = async (cardId: string) => {
        const card = await db.collection("cards").updateOne(
          {
            cardId,
          },
          {
            $set: {
              index: sourceCard.index,
            },
          },
          {
            upsert: true,
          }
        );
      };

      const isSouce = await updateSourceCardSequence(String(cardId));
      const isDest = await updateDestinationCardSequence(String(destCardId));

      res.status(201).json({
        success: true,
        message: "index are updated!",
        data: {
          isSouce,
          isDest,
        },
      });
    });
  } else {
    res.status(405).json({
      error: "invalid request method!",
    });
  }
};

export default handler;
