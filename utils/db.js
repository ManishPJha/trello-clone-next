import { MongoClient } from "mongodb";

const { LOCAL_DB_URI, LIVE_DB_URI, DB_NAME } = process.env;

if (!LOCAL_DB_URI)
  throw new Error(
    "Please define LOCAL_DB_URI environment variable inside .env.local file!"
  );

if (!LIVE_DB_URI)
  throw new Error(
    "Please define LIVE_DB_URI environment variable inside .env.local file!"
  );

if (!DB_NAME)
  throw new Error(
    "Please define DB_NAME environment variable inside .env.local file!"
  );

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  try {
    if (cached.conn) {
      return cached.conn;
    }
    if (!cached.promise) {
      const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

      let db_url =
        process.env.NODE_ENV === "development" ? LOCAL_DB_URI : LIVE_DB_URI;
      cached.promise = MongoClient.connect(db_url, opts).then((client) => {
        return {
          client,
          db: client.db(DB_NAME),
        };
      });

      cached.conn = await cached.promise;

      return cached.conn;
    }
  } catch (error) {
    let err =
      process.env.NODE_ENV === "development" ? error.stack : error.message;
    console.log(">>>DB Connection Error", err);
  }
};
