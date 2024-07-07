/* eslint-disable @typescript-eslint/no-unused-vars */
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
  addAdvertisement: (_subCampaignId: number) => {},
  updateInformation: (
    _key: keyof Pick<ICampaignInfo, "name" | "describe">,
    _value: string
  ) => {},
  updateInfoSubCampaign: (
    _args: TUpdateSubCampaignArgs<"name"> | TUpdateSubCampaignArgs<"status">
  ) => {},
  updateAdvertisement: (
    _args:
      | TUpdateAdvertisementArgs<"name">
      | TUpdateAdvertisementArgs<"quantity">
  ) => {},
  deleteAdvertisement: (
    _subCampaignId: number,
    _listIdAdvertisement: number[]
  ) => {},

  isCheckValid: false,
  updateIsCheckValid: (_value: boolean) => {},
});

export default CampaignContext;
