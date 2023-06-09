import District from "../model/District.js";
import districtDataJson from "../data/DistrictOutput.js";

async function LoadDistrictData() {
  const districtData: {
    title: string;
    id: string;
    color: string;
    balloonText: string;
  }[] = districtDataJson;

  if (districtData.length < 1) {
    return;
  }
  const newData = districtData.map((item) => ({
    title: item.title,
    districtId: parseInt(item.id),
    warning: { color: item.color, innerText: item.balloonText },
  }));
  await District.deleteMany().exec();
  District.insertMany(newData)
    .then((res) => {
      console.log("successfully inserted");
    })
    .catch((err) => {
      console.log(err);
    });
}

export { LoadDistrictData };
