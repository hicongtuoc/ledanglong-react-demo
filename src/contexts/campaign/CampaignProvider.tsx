import React, { useState } from "react";
import {
  ICampaign,
  ICampaignInfo,
  ISubCampaigns,
  TUpdateAdvertisementArgs,
  TUpdateSubCampaignArgs,
} from "../../types";
import {
  generateAdvertisementName,
  generateSubCampaignName,
} from "../../utils";
import CampaignContext, {
  INFORMATION_DEFAULT,
  SUB_CAMPAIGNS_DEFAULT,
} from "./CampaignContext";

interface CampaignProviderProps {
  children: React.ReactNode;
}

const CampaignProvider = ({ children }: CampaignProviderProps) => {
  const [campaignData, setCampaignData] = useState<ICampaign>({
    information: INFORMATION_DEFAULT,
    subCampaigns: [SUB_CAMPAIGNS_DEFAULT],
  });
  const [isCheckValid, setIsCheckValid] = useState(false);

  const updateIsCheckValid = (value: boolean) => {
    setIsCheckValid(value);
  };

  const updateInformation = (
    key: keyof Pick<ICampaignInfo, "name" | "describe">,
    value: string
  ) => {
    setCampaignData((prevData) => ({
      ...prevData,
      information: { ...prevData.information, [key]: value },
    }));
  };

  const addSubCampaign = () => {
    const lengthOfSubCampaigns = campaignData.subCampaigns.length;
    const newIndexRecord = lengthOfSubCampaigns + 1;
    const newSubCampaigns: ISubCampaigns = {
      id: Date.now(),
      name: generateSubCampaignName(newIndexRecord),
      status: SUB_CAMPAIGNS_DEFAULT.status,
      ads: SUB_CAMPAIGNS_DEFAULT.ads,
    };
    setCampaignData((prevData) => ({
      ...prevData,
      subCampaigns: [...prevData.subCampaigns, newSubCampaigns],
    }));
  };

  const updateInfoSubCampaign = (
    args: TUpdateSubCampaignArgs<"name"> | TUpdateSubCampaignArgs<"status">
  ) => {
    const { subCampaignId, key, value } = args;
    setCampaignData((prevData) => {
      const subCampaigns = prevData.subCampaigns.map((subCampaign) => {
        if (subCampaign.id !== subCampaignId) {
          return subCampaign;
        }
        return { ...subCampaign, [key]: value };
      });
      return { ...prevData, subCampaigns };
    });
  };

  const addAdvertisement = (subCampaignId: number) => {
    setCampaignData((prevData) => {
      const subCampaigns = prevData.subCampaigns.map((subCampaign) => {
        if (subCampaign.id === subCampaignId) {
          const lengthOfAds = subCampaign.ads.length;
          const newIndexRecord = lengthOfAds + 1;
          const newAds = {
            id: Date.now(),
            name: generateAdvertisementName(newIndexRecord),
            quantity: 0,
          };
          return { ...subCampaign, ads: [...subCampaign.ads, newAds] };
        }
        return subCampaign;
      });
      return { ...prevData, subCampaigns };
    });
  };

  const updateAdvertisement = (
    args:
      | TUpdateAdvertisementArgs<"name">
      | TUpdateAdvertisementArgs<"quantity">
  ) => {
    const { advertisementId, subCampaignId, key, value } = args;
    setCampaignData((prevData) => {
      const subCampaigns = prevData.subCampaigns.map((subCampaign) => {
        if (subCampaign.id !== subCampaignId) {
          return subCampaign;
        }

        const ads = subCampaign.ads.map((adsItem) => {
          if (adsItem.id !== advertisementId) return adsItem;
          return { ...adsItem, [key]: value };
        });

        return { ...subCampaign, ads };
      });

      return { ...prevData, subCampaigns };
    });
  };

  const deleteAdvertisement = (
    subCampaignId: number,
    listIdAdvertisement: number[]
  ) => {
    setCampaignData((prevData) => {
      const subCampaigns = prevData.subCampaigns.map((subCampaign) => {
        if (subCampaign.id !== subCampaignId) {
          return subCampaign;
        }

        const ads = subCampaign.ads.filter(
          (adsItem) => !listIdAdvertisement.includes(adsItem.id)
        );

        return { ...subCampaign, ads };
      });

      return { ...prevData, subCampaigns };
    });
  };

  const value = {
    campaign: campaignData,
    updateInformation,

    addSubCampaign,
    updateInfoSubCampaign,

    addAdvertisement,
    updateAdvertisement,
    deleteAdvertisement,

    isCheckValid,
    updateIsCheckValid,
  };

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
};

export default CampaignProvider;
