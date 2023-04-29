import District from "../model/District.js";
import { deviceData } from "../data/devices.js";
import IotDevice from "../model/IotDevice.js";

function LoadDeviceData() {
  const newData = deviceData.map((item) => {
    return District.findOne({
      title: item.districtName,
    })
      .exec()
      .then((res) => {
        if (res) {
          return {
            district: res._id,
            districtId: res.districtId,
            latitude: item.latitude,
            longitude: item.longitude,
            lastFetch: item.lastFetch,
          };
        }
      })
      .catch((err) => console.log(err));
  });

  IotDevice.insertMany(newData)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

export { LoadDeviceData };
