import { AxiosResponse } from "axios";
import axios from "axios";
import fs from "fs/promises";

export default async function DownloadWarningOutput(): Promise<void> {
  const url = "https://mausam.imd.gov.in/responsive/districtWiseWarning.php";
  const regex = /"areas"\s*:\s*\[([\s\S]*?)\]/;

  try {
    const response: AxiosResponse = await axios.get(url);

    let data = response.data;

    // Remove white spaces and new lines from the downloaded PHP file
    const cleanedData = data.replace(/\s/g, "");

    // Extract the selected string using the regex
    const match = regex.exec(cleanedData);
    const selectedString = match ? match[1] : "";

    // Create a new JSON file with the extracted string
    const jsonContent = `const data = [${selectedString}]; export default data;`;

    await fs.writeFile("./src/data/DistrictOutput.js", jsonContent);
    await fs.writeFile("./dist/data/DistrictOutput.js", jsonContent);

    console.log("JSON file created successfully.");
  } catch (error) {
    console.error("Error downloading or writing JSON file:", error);
  }
}
