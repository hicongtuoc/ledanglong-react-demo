import { TabContext, TabList, TabPanel } from "@mui/lab";
import { AppBar, Box, Button, Grid, Paper, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { InfoCampaign } from "./components/InfoCampaign/InfoCampaign";
import { SubCampaigns } from "./components/SubCampaigns";
import CampaignProvider from "./contexts/campaign/CampaignProvider";
import useCampaign from "./hooks/useCampaign";
import HeaderApp from "./components/headerApp";

enum TabValue {
  INFO = "info",
  CHILD_CAMPAIGNS = "childCampaigns",
}

function App() {
  const [tabValue, setTabValue] = useState<TabValue>(TabValue.INFO);

  const handleTabChange = (event: React.SyntheticEvent, newValue: TabValue) => {
    setTabValue(newValue);
  };

  return (
    <CampaignProvider>
      <div className="App-intro">
        <HeaderApp />
        <Grid container sx={{ flexGrow: 1, p: 3 }}>
          <Paper elevation={1} sx={{ width: "100%" }}>
            <TabContext value={tabValue}>
              <AppBar
                position="static"
                color="default"
                sx={{
                  background: "#fff",
                  color: "inherit",
                  boxShadow: "none",
                  borderBottom: "1px solid #e0e0e0",
                  ".MuiTabs-indicator": {
                    backgroundColor: "#3f51b5",
                  },
                }}
              >
                <TabList
                  onChange={handleTabChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    sx={{
                      "&.Mui-selected": {
                        color: "#3f51b5",
                      },
                    }}
                    label="Thông tin"
                    value={TabValue.INFO}
                  />
                  <Tab
                    sx={{
                      "&.Mui-selected": {
                        color: "#3f51b5",
                      },
                    }}
                    label="Chiến dịch con"
                    value={TabValue.CHILD_CAMPAIGNS}
                  />
                </TabList>
              </AppBar>
              <TabPanel value={TabValue.INFO}>
                <InfoCampaign />
              </TabPanel>
              <TabPanel value={TabValue.CHILD_CAMPAIGNS}>
                <SubCampaigns />
              </TabPanel>
            </TabContext>
          </Paper>
        </Grid>
      </div>
    </CampaignProvider>
  );
}

export default App;
