import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import useCampaign from "../../hooks/useCampaign";
import { ISubCampaignsAds } from "../../types";
import { EnhancedTableHead } from "./EnhancedTableHead";

interface ITableAdvertisementProps {
  adsList: ISubCampaignsAds[];
  idSubCampaign: number;
}

export function TableAdvertisement(props: ITableAdvertisementProps) {
  const { adsList, idSubCampaign } = props;
  const { updateAdvertisement, deleteAdvertisement, isCheckValid } =
    useCampaign();

  const [selected, setSelected] = useState<number[]>([]);

  const handleSelectAllClick = (value: boolean) => {
    let newSelecteds: number[] = [];
    switch (value) {
      case true:
        newSelecteds = adsList.map((n) => n.id);
        setSelected(newSelecteds);
        break;
      case false:
        setSelected([]);
        break;
    }
  };

  const handleClick = (id: number) => {
    let newSelected: number[] = [];
    if (selected.includes(id)) {
      newSelected = selected.filter((item) => item !== id);
    } else {
      newSelected = [...selected, id];
    }
    setSelected(newSelected);
  };

  const namesError = useMemo(() => {
    return adsList.map((item) => {
      if (!item.name) {
        return item.id;
      }
    });
  }, [adsList]);

  const quantityError = useMemo(() => {
    return adsList.map((item) => {
      if (item.quantity < 1) {
        return item.id;
      }
    });
  }, [adsList]);

  const checkIsSelected = (id: number) => {
    return selected.some((item) => item === id);
  };

  useEffect(() => {
    setSelected([]);
  }, [idSubCampaign]);

  return (
    <Table aria-label="ad table">
      <EnhancedTableHead
        subCampaignId={idSubCampaign}
        selected={selected}
        onSelectAllClick={handleSelectAllClick}
        rowCount={adsList.length}
      />
      <TableBody>
        {adsList.map((row, index) => {
          const isItemSelected = checkIsSelected(row.id);
          const labelId = `enhanced-table-checkbox-${index}`;
          return (
            <TableRow
              hover
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={`${idSubCampaign}_${row.id}`}
              selected={isItemSelected}
              sx={{
                "&.MuiTableRow-root.Mui-selected": {
                  backgroundColor: "rgba(245, 0, 87, 0.08)",
                },
              }}
            >
              <TableCell sx={{ padding: "0px 0px 0px 4px" }} padding="checkbox">
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon />}
                  checked={isItemSelected}
                  inputProps={{ "aria-labelledby": labelId }}
                  onClick={() => handleClick(row.id)}
                  sx={{ "&.Mui-checked": { color: "#3f51b5" } }}
                />
              </TableCell>
              <TableCell sx={{ pt: 1, pb: 1 }}>
                <TextField
                  error={namesError.includes(row.id) && isCheckValid}
                  required
                  fullWidth
                  defaultValue={row.name}
                  variant="standard"
                  onChange={(e) =>
                    updateAdvertisement({
                      advertisementId: row.id,
                      subCampaignId: idSubCampaign,
                      key: "name",
                      value: e.target.value,
                    })
                  }
                />
              </TableCell>
              <TableCell sx={{ pt: 1, pb: 1 }}>
                <TextField
                  error={quantityError.includes(row.id) && isCheckValid}
                  fullWidth
                  type="number"
                  defaultValue={row.quantity}
                  variant="standard"
                  required
                  onChange={(e) =>
                    updateAdvertisement({
                      advertisementId: row.id,
                      subCampaignId: idSubCampaign,
                      key: "quantity",
                      value: Number(e.target.value),
                    })
                  }
                />
              </TableCell>
              <TableCell align="right">
                <div
                  onClick={() =>
                    !selected.length &&
                    deleteAdvertisement(idSubCampaign, [row.id])
                  }
                >
                  <IconButton
                    size="small"
                    title="Xóa"
                    disabled={!!selected.length}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
