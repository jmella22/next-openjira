// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedData } from "../../database";
import { EntryModel } from "../../models";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "No tiene acceso a este servicio" });
  }
  try {
    await db.connect();
    await EntryModel.deleteMany();
    await EntryModel.insertMany(seedData.entries);
    console.log("data insertada");
    await db.disconnect();
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ message: "Proceso realizado correctamente" });
}
