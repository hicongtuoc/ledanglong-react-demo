import { useContext, useMemo } from "react";
import CampaignContext from "../contexts/campaign/CampaignContext";
import {
  ICampaignInfo,
  TUpdateAdvertisementArgs,
  TUpdateSubCampaignArgs,
} from "../types";

const useCampaign = () => {
  const context = useContext(CampaignContext);

  if (!context) {
    throw new Error("useCampaign must be used within a CampaignProvider");
  }

  const informationCampaign = useMemo(() => {
    return context.campaign?.information;
  }, [context.campaign?.information]);

  const subCampaigns = useMemo(() => {
    return context.campaign?.subCampaigns;
  }, [context.campaign?.subCampaigns]);

  const isCheckValid = useMemo(() => {
    return context.isCheckValid;
  }, [context.isCheckValid]);

  const updateIsCheckValid = (value: boolean) => {
    context.updateIsCheckValid(value);
  };

  const updateInformation = (
    key: keyof Pick<ICampaignInfo, "name" | "describe">,
    value: string
  ) => {
    context.updateInformation(key, value);
  };

  const updateSubCampaign = (
    args: TUpdateSubCampaignArgs<"name"> | TUpdateSubCampaignArgs<"status">
  ) => {
    context.updateInfoSubCampaign(args);
  };

  const addSubCampaign = () => {
    context.addSubCampaign();
  };

  const addAdvertisement = (subCampaignId: number) => {
    context.addAdvertisement(subCampaignId);
  };

  const updateAdvertisement = (
    args:
      | TUpdateAdvertisementArgs<"name">
      | TUpdateAdvertisementArgs<"quantity">
  ) => {
    context.updateAdvertisement(args);
  };

  const deleteAdvertisement = (
    subCampaignId: number,
    listIdAdvertisement: number[]
  ) => {
    context.deleteAdvertisement(subCampaignId, listIdAdvertisement);
  };

  return {
    informationCampaign,
    subCampaigns,
    updateInformation,
    addSubCampaign,
    updateSubCampaign,
    addAdvertisement,
    updateAdvertisement,
    deleteAdvertisement,
    isCheckValid,
    updateIsCheckValid,
  };
};

export default useCampaign;
