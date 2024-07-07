import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
} from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TableContainer,
  TextField,
  Typography,
} from "@mui/material";
import useCampaign from "../../hooks/useCampaign";
import { ISubCampaigns } from "../../types";
import { TableAdvertisement } from "../tableAdvertisement/TableAdvertisement";
import { useMemo } from "react";

interface IInFoSubCampaignsProps {
  selectedSubCampaign: ISubCampaigns;
}

export function InfoSubCampaigns(props: IInFoSubCampaignsProps) {
  const { selectedSubCampaign } = props;
  const { updateSubCampaign, isCheckValid } = useCampaign();

  const nameError = useMemo(() => {
    if (!selectedSubCampaign.name) {
      return "Dữ liệu không hợp lệ";
    }
  }, [selectedSubCampaign.name]);

  return (
    <>
      <Grid container sx={{ p: 1 }}>
        <Grid item xs={8} sx={{ p: 1 }}>
          <TextField
            required
            fullWidth
            id="name"
            label="Tên chiến dịch con"
            value={selectedSubCampaign?.name}
            variant="standard"
            InputLabelProps={{ shrink: true }}
            onChange={(e) =>
              updateSubCampaign({
                subCampaignId: props.selectedSubCampaign.id,
                key: "name",
                value: e.target.value,
              })
            }
            error={!!nameError && isCheckValid}
            helperText={isCheckValid ? nameError : null}
          />
        </Grid>
        <Grid item xs={4} sx={{ p: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedSubCampaign?.status ?? false}
                  color="primary"
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon />}
                  onChange={() =>
                    updateSubCampaign({
                      subCampaignId: props.selectedSubCampaign.id,
                      key: "status",
                      value: !props.selectedSubCampaign?.status,
                    })
                  }
                  sx={{ "&.Mui-checked": { color: "#3f51b5" } }}
                />
              }
              label="Đang hoạt động"
            />
          </Box>
        </Grid>
      </Grid>
      <TableContainer>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ padding: 2, textAlign: "left", mt: 2 }}
        >
          DANH SÁCH QUẢNG CÁO
        </Typography>
        <TableAdvertisement
          idSubCampaign={selectedSubCampaign.id}
          adsList={selectedSubCampaign.ads}
        />
      </TableContainer>
    </>
  );
}
