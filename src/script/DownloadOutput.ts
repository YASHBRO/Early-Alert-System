import { AxiosResponse } from "axios";

import axios from "axios";
import fs from "fs";

export default function DownloadWarningOutput() {
  const url = "https://mausam.imd.gov.in/responsive/districtWiseWarning.php";
  const regex = /"areas"\s*:\s*\[([\s\S]*?)\]/;

  axios
    .get(url)
    .then((response: AxiosResponse) => {
      let data = response.data;

      // Remove white spaces and new lines from the downloaded PHP file
      const cleanedData = data.replace(/\s/g, "");

      // Extract the selected string using the regex
      const match = regex.exec(cleanedData);
      const selectedString = match ? match[1] : "";

      // Create a new JSON file with the extracted string
      const jsonContent = `[${selectedString}]`;
      fs.writeFile("./src/data/DistrictOutput.json", jsonContent, (error) => {
        if (error) {
          console.error("Error writing JSON file:", error);
        } else {
          console.log("JSON file created successfully.");
        }
      });
    })
    .catch((error: Error) => {
      console.error("Error downloading PHP file:", error);
    });
}
