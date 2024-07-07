import { Box, Button, Grid } from "@mui/material";
import useCampaign from "../../hooks/useCampaign";
import { ICampaign } from "../../types";

export default function HeaderApp() {
  const { informationCampaign, subCampaigns, updateIsCheckValid } =
    useCampaign();

  const validateCampaign = (campaign: ICampaign) => {
    const errors = [];

    // Check campaign info name
    if (!campaign.information.name.trim()) {
      errors.push("Campaign name cannot be empty.");
    }

    // Check subCampaigns
    campaign.subCampaigns.forEach((subCampaign) => {
      if (!subCampaign.name.trim()) {
        errors.push(`SubCampaign id ${subCampaign.id} name cannot be empty.`);
      }

      // Check ads in each subCampaign
      subCampaign.ads.forEach((ad) => {
        if (!ad.name.trim()) {
          errors.push(
            `Ad id ${ad.id} in SubCampaign id ${subCampaign.id} name cannot be empty.`
          );
        }
        if (ad.quantity <= 0) {
          errors.push(
            `Ad id ${ad.id} in SubCampaign id ${subCampaign.id} quantity must be greater than 0.`
          );
        }
      });
    });

    if (errors.length > 0) {
      return true;
    }

    return false;
  };

  const submitCampaign = () => {
    updateIsCheckValid(true);
    const valueSubmit = {
      campaign: {
        information: informationCampaign,
        subCampaigns: subCampaigns,
      },
    };

    if (validateCampaign(valueSubmit.campaign)) {
      window.alert("Vui lòng điền đúng và đầy đủ thông tin");
      return;
    }

    window.alert(`Thêm thành công chiến dịch\n${JSON.stringify(valueSubmit)}`);
  };
  return (
    <Grid container sx={{ pt: 2 }}>
      <Grid item xs={12} sx={{ borderBottom: "1px solid gray" }}>
        <Box sx={{ textAlign: "end", mb: 2, mr: 2 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "#3f51b5" }}
            onClick={submitCampaign}
          >
            Submit
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
