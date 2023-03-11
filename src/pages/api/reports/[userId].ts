import { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";
import Report from "@/models/Report";
import { withAuth } from "@/lib/withAuth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  try {
    if (!userId) {
      res.json({
        msj: "Debes enviar un userId",
      });
    }

    if (!isValidObjectId(userId as string)) {
      res.json({
        msj: "El userId no es valido",
      });
    }

    const reports = await Report.find({ userRef: userId as string });
    res.json({ reports });
  } catch (error) {
    res.json({ msj: "Ocurrio un error", error });
  }
}

export default withAuth(handler);
