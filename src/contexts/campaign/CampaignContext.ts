import { createContext } from "react";
import {
  ICampaignInfo,
  ISubCampaigns,
  TUpdateAdvertisementArgs,
  TUpdateSubCampaignArgs,
} from "../../types";
import {
  generateAdvertisementName,
  generateSubCampaignName,
} from "../../utils";

export const INFORMATION_DEFAULT: ICampaignInfo = {
  name: "",
  describe: "",
};

export const SUB_CAMPAIGNS_DEFAULT: ISubCampaigns = {
  id: 1,
  name: generateSubCampaignName(1),
  status: true,
  ads: [
    {
      id: 1,
      name: generateAdvertisementName(1),
      quantity: 0,
    },
  ],
};

const CampaignContext = createContext({
  campaign: {
    information: INFORMATION_DEFAULT,
    subCampaigns: [SUB_CAMPAIGNS_DEFAULT],
  },
  addSubCampaign: () => {},
  addAdvertisement: (subCampaignId: number) => {},
  updateInformation: (
    key: keyof Pick<ICampaignInfo, "name" | "describe">,
    value: string
  ) => {},
  updateInfoSubCampaign: (
    args: TUpdateSubCampaignArgs<"name"> | TUpdateSubCampaignArgs<"status">
  ) => {},
  updateAdvertisement: (
    args:
      | TUpdateAdvertisementArgs<"name">
      | TUpdateAdvertisementArgs<"quantity">
  ) => {},
  deleteAdvertisement: (
    subCampaignId: number,
    listIdAdvertisement: number[]
  ) => {},

  isCheckValid: false,
  updateIsCheckValid: (value: boolean) => {},
});

export default CampaignContext;
