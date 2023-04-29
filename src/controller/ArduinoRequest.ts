import { NextFunction, Request, Response } from "express";
import District from "../model/District.js";

function ArduinoRequest(req: Request, res: Response, next: NextFunction) {
  const reqDistrictId = req.query["district"];
  const resResult: {
    district?: string;
    warningText?: string;
    warning: boolean;
  } = { warning: false };
  if (typeof reqDistrictId === "string") {
    District.findOne({ districtId: parseInt(reqDistrictId) })
      .exec()
      .then((res) => {
        if (res) {
          if (!res.warning?.innerText?.includes("Nowarning")) {
            resResult.district = res.title;
            resResult.warning = true;
            resResult.warningText = res.warning?.innerText;
          }
        }
      })
      .finally(() => {
        res.json(resResult);
        next();
        return;
      });
  }
}

export default ArduinoRequest;
