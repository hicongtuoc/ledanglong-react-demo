import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  Checkbox,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useCampaign from "../../hooks/useCampaign";

interface EnhancedTableHeadProps {
  classes?: string;
  selected: number[];
  onSelectAllClick: (value: boolean) => void;
  rowCount: number;
  subCampaignId: number;
}

export function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const { onSelectAllClick, selected, rowCount, subCampaignId } = props;

  const { addAdvertisement, deleteAdvertisement } = useCampaign();

  const numSelected = selected.length;

  const handleDelete = () => {
    deleteAdvertisement(subCampaignId, selected);
    onSelectAllClick(false);
  };

  return (
    <TableHead>
      <TableRow sx={{ maxHeight: "57px" }}>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={(event) => onSelectAllClick(event.target.checked)}
            inputProps={{ "aria-label": "select all desserts" }}
            sx={{ "&.Mui-checked": { color: "#3f51b5" } }}
          />
        </TableCell>
        {numSelected ? (
          <TableCell
            colSpan={2}
            sx={{
              padding: "12px",
            }}
          >
            <div onClick={handleDelete}>
              <IconButton size="small" title="Xóa">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          </TableCell>
        ) : (
          <>
            <TableCell>
              <Typography fontWeight="bold">Tên quảng cáo*</Typography>
            </TableCell>
            <TableCell sx={{ width: "38%" }}>
              <Typography fontWeight="bold">Số lượng*</Typography>
            </TableCell>
          </>
        )}

        <TableCell align="right" sx={{ padding: "0px 16px", width: "120px" }}>
          <ButtonGroup variant="outlined" color="primary">
            <Button
              onClick={() => addAdvertisement(subCampaignId)}
              startIcon={<AddIcon />}
              sx={{
                border: "1px solid #3f51b5",
                color: "#3f51b5",
              }}
            >
              Thêm
            </Button>
          </ButtonGroup>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
