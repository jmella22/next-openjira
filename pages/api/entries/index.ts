import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { EntryModel, IEntry } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IEntry[]
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);

    case "POST":
      return postEntry(req, res);

    default:
      return res.status(400).json({ message: "Endpoint no exsiste" });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const entries = await EntryModel.find().sort({ createdAt: "ascending" });
    await db.disconnect();
    return res.status(200).json(entries);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res
      .status(500)
      .json({ message: "algo malio sal, revisar consola del servidor" });
  }
};

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description = "" } = req.body;

  const newEntry = new EntryModel({
    description,
    createdAt: Date.now(),
  });

  try {
    await db.connect();
    await newEntry.save();
    await db.disconnect();
    return res.status(200).json(newEntry);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res
      .status(500)
      .json({ message: "algo malio sal, revisar consola del servidor" });
  }
};
