import { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";
import { withAuth } from "@/lib/withAuth";
import Report from "@/models/Report";
import db from "@/utils/db";
import { verify } from "jsonwebtoken";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { reportId } = req.query;

    if (!reportId) {
      res.json({
        msj: "Debes enviar un reportId",
      });
    }

    if (!isValidObjectId(reportId)) {
      res.json({
        msj: "El reportId no es valido",
      });
    }

    try {
      await db.connect();
      const reportDeleted = await Report.findByIdAndDelete(reportId);
      await db.disconnect();
      res.json({
        msj: "El reporte fue eliminado correctamente",
        reportDeleted,
      });
    } catch (error) {
      res.json({ msj: "Ocurrio un error", error });
    }
  } else if (req.method === "GET") {
    const { gdi_cookie } = req.cookies;
    const { reportId } = req.query;
    const cookie = verify(gdi_cookie!, process.env.JWT_SECRET!);

    if (!reportId) {
      res.json({
        msj: "Debes enviar un reportId",
      });
    }

    if (!isValidObjectId(reportId)) {
      res.json({
        msj: "El reportId no es valido",
      });
    }

    try {
      await db.connect();
      const report = await Report.findById(reportId);

      // @ts-ignore
      if (String(report.userRef) !== cookie.data._id) {
        res.json({
          msj: "El reportId no es valido",
        });
      }
      await db.disconnect();
      res.json({
        report,
      });
    } catch (error) {
      res.json({ msj: "Ocurrio un error", error });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

export default withAuth(handler);
