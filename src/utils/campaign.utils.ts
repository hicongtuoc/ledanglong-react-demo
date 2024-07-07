interface IObject {
  id?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

function generateSubCampaignName(index: number) {
  return `Chiến dịch con ${index}`;
}

function generateAdvertisementName(index: number) {
  return `Quảng cáo ${index}`;
}

function removeId(obj: IObject): IObject {
  // Tạo một bản sao mới của object
  const newObj: IObject = { ...obj };

  // Loại bỏ trường id của bản sao mới
  delete newObj.id;

  // Đệ quy loại bỏ trường id của các object con
  // Đệ quy loại bỏ trường id của các object con
  for (const key in newObj) {
    if (typeof newObj[key] === "object") {
      if (Array.isArray(newObj[key])) {
        // Xử lý trường mảng
        newObj[key] = newObj[key].map((item) => removeId(item));
      } else {
        // Xử lý trường object
        newObj[key] = removeId(newObj[key]);
      }
    }
  }

  // Trả về bản sao mới
  return newObj;
}

export { generateSubCampaignName, generateAdvertisementName, removeId };
