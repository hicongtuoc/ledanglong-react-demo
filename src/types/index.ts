export interface ISubCampaignsAds {
  id: number;
  name: string;
  quantity: number;
}

export interface ISubCampaigns {
  id: number;
  name: string;
  status: boolean;
  ads: ISubCampaignsAds[];
}

export interface ICampaignInfo {
  name: string;
  describe?: string;
}

export interface ICampaign {
  information: ICampaignInfo;
  subCampaigns: ISubCampaigns[];
}

export interface TUpdateSubCampaignArgs<
  T extends keyof Pick<ISubCampaigns, "name" | "status">
> {
  subCampaignId: number;
  key: T;
  value: ISubCampaigns[T];
}

export interface TUpdateAdvertisementArgs<
  T extends keyof Pick<ISubCampaignsAds, "name" | "quantity">
> {
  subCampaignId: number;
  advertisementId: number;
  key: T;
  value: ISubCampaignsAds[T];
}
