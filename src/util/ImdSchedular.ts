import cron from "node-cron";
import DownloadWarningOutput from "../script/DownloadOutput.js";

export default function ImdSchedular() {
  cron.schedule("*/1 * * * *", () => {
    DownloadWarningOutput();
    const date = new Date();
    console.log("Synced with IMD website at :", date.toLocaleString());
  });
}
