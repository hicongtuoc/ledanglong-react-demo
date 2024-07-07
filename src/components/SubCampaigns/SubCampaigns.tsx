import { Add as AddIcon } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import useCampaign from "../../hooks/useCampaign";
import { ISubCampaigns } from "../../types";
import { InfoSubCampaigns } from "./InfoSubCampaigns";
import { ItemSubCampaign } from "./ItemSubCampaign";

export function SubCampaigns() {
  const { subCampaigns, addSubCampaign } = useCampaign();
  const [selectedSubCampaign, setSelectedSubCampaign] = useState<ISubCampaigns>(
    subCampaigns[0]
  );

  useEffect(() => {
    setSelectedSubCampaign((prev) => {
      const found = subCampaigns.find((item) => item.id === prev.id);
      return found || subCampaigns[0];
    });
  }, [subCampaigns]);

  return (
    <Box className="MuiBox-root jss6">
      <Grid container>
        <Grid item xs={12} sx={{ overflow: "auto", pb: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "row", width: "968px" }}>
            <div>
              <IconButton
                onClick={addSubCampaign}
                color="error"
                sx={{ backgroundColor: "#ededed" }}
              >
                <AddIcon />
              </IconButton>
            </div>

            {subCampaigns.map((campaign) => (
              <ItemSubCampaign
                key={campaign.id}
                campaign={campaign}
                selectedSubCampaign={selectedSubCampaign}
                setSelectedSubCampaign={(campaign: ISubCampaigns) =>
                  setSelectedSubCampaign(campaign)
                }
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <InfoSubCampaigns selectedSubCampaign={selectedSubCampaign} />
        </Grid>
      </Grid>
    </Box>
  );
}
