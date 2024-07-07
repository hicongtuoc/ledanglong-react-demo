import { Box, Grid, TextField } from "@mui/material";
import useCampaign from "../../hooks/useCampaign";
import { useMemo } from "react";

export function InfoCampaign() {
  const { informationCampaign, updateInformation, isCheckValid } =
    useCampaign();

  const nameError = useMemo(() => {
    if (!informationCampaign.name) {
      return "Dữ liệu không hợp lệ";
    }
  }, [informationCampaign.name]);

  return (
    <Box>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              error={!!nameError && isCheckValid}
              required
              fullWidth
              label="Tên chiến dịch"
              variant="standard"
              margin="normal"
              value={informationCampaign.name}
              onChange={(e) => updateInformation("name", e.target.value)}
              helperText={isCheckValid ? nameError : null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mô tả"
              variant="standard"
              margin="normal"
              value={informationCampaign.describe}
              onChange={(e) => updateInformation("describe", e.target.value)}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
