import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useMemo } from "react";
import useCampaign from "../../hooks/useCampaign";
import { ISubCampaigns } from "../../types";

interface ItemSubCampaignProps {
  campaign: ISubCampaigns;
  selectedSubCampaign: ISubCampaigns;
  setSelectedSubCampaign: (campaign: ISubCampaigns) => void;
}

export function ItemSubCampaign(props: ItemSubCampaignProps) {
  const { campaign, selectedSubCampaign, setSelectedSubCampaign } = props;
  const { isCheckValid } = useCampaign();

  const sumQuantity = useMemo(() => {
    return campaign.ads.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
  }, [selectedSubCampaign]);

  const handleColor = useMemo(() => {
    const numAds = campaign.ads.length;
    const quantityError = campaign.ads.some((item) => {
      return item.quantity < 1 || !item.name;
    });
    return (quantityError || !numAds) && isCheckValid ? "red" : "inherit";
  }, [campaign.ads, selectedSubCampaign, isCheckValid]);

  return (
    <Card
      sx={{
        minWidth: "210px",
        width: "210px",
        height: "120px",
        ml: 2,
        cursor: "pointer",
        border: "2px solid",
        borderColor:
          selectedSubCampaign.id === campaign.id
            ? "rgb(33, 150, 243)"
            : "rgb(250, 250, 250)",
      }}
      onClick={() => setSelectedSubCampaign(campaign)}
    >
      <CardHeader
        sx={{ padding: "8px 8px 4px" }}
        title={
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: handleColor,
              whiteSpace: "normal",
              wordBreak: "break-all",
            }}
          >
            {campaign.name}
            {
              <CheckCircleIcon
                fontSize="small"
                sx={{
                  fontSize: "14px",
                  color: campaign.status
                    ? "rgb(0, 128, 0)"
                    : "rgb(141, 141, 141)",
                  pl: 1,
                }}
              />
            }
          </Typography>
        }
      />
      <CardContent sx={{ padding: "0px 8px" }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          justifyContent="center"
          display="flex"
        >
          {sumQuantity}
        </Typography>
      </CardContent>
    </Card>
  );
}
