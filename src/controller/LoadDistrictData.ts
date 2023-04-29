import District from "../model/District.js";
import { districtData } from "../data/warnings.js";

function LoadDistrictData() {
  const newData = districtData.map((item) => ({
    title: item.title,
    districtId: parseInt(item.id),
    warning: { color: item.color, innerText: item.balloonText },
  }));
  District.insertMany(newData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { LoadDistrictData };
