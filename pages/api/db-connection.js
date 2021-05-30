import { MongoClient } from "mongodb";
const DB_ACCESS =
  "mongodb+srv://yalcinaksakal:95tEPq74uhiLGmT@cluster0.srzeq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// yalcinaksakal:95tEPq74uhiLGmT

let progressCollection = null;

export const getDbConnection = async () => {
  const isWindow = typeof window !== "undefined";
  if (isWindow) return null;
  if (progressCollection) return progressCollection;
  const client = await MongoClient.connect(DB_ACCESS);
  const db = client.db();
  progressCollection = db.collection("progress");
  return progressCollection;
};

export default (req, res) => {
  res.statusCode = 401;
  res.json(null);
  return;
};
