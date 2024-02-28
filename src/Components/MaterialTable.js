import React, { useMemo, useState } from "react";
import { CSVLink } from "react-csv";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from 'material-react-table';
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  lighten,
} from '@mui/material';
import { AutoDeleteRounded, Edit, GroupAdd, Download } from '@mui/icons-material';
import { userFields } from "./fields";
import From from './Form';
import Modal from "./Modal";
import { clientApiCall } from "../config";


//simple data example - Check out https://www.material-react-table.com/docs/examples/remote for a more complex example

let headers = [
  { label: "Id", key: "id" },
  { label: "Name", key: "name" },
  { label: "License Number", key: "licensenumber" },
  { label: "Date Of Birth", key: "dateofbirth" },
  { label: "Age", key: "age" },
  { label: "Created At", key: "createdAt" },
  { label: "Updated At", key: "updatedAt" }
];

export default function MaterialTable({data, setEditFrom, setEnableFrom, focus, deleteUser, setFromUpdate}) {
  const [csvData, setCsvData] = useState([])
  const columns = useMemo(
    () => userFields,
    []
  );

  const table = useMaterialReactTable({
    data,
    columns,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'],
        right: ['mrt-row-actions'],
      },
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [10, 20, 30],
      shape: 'rounded',
      variant: 'outlined',
    },
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key={0}
        onClick={async() => {
          console.log("Delete user", row.original);
          await deleteUser(row.original?.id);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <AutoDeleteRounded />
        </ListItemIcon>
        Delete User
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          console.log("edit user", row.original);
          setFromUpdate(true);
          setEditFrom(row.original);
          setEnableFrom(true);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        Edit
      </MenuItem>,
    ],
    renderTopToolbar: ({ table }) => {
      const handleDownload = () => {
        let result = [];
        
        table.getSelectedRowModel().flatRows.map((row) => {
          result.push(row.original);
        });
        if (result.length !== 0) {
          setCsvData(result);
        }
        console.log("---106---", result);
      };

      const handleCreate = () => {
        setEnableFrom(true);
        setEditFrom({
          name: '',
          licensenumber: '',
          dateofbirth: '',
          age: ''
        });
      
      };

      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
            display: 'flex',
            gap: '0.5rem',
            p: '8px',
            justifyContent: 'space-between',
          })}
        >
          <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          
          </Box>
          <Box>
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
            
              <Button
                color="success"
                onClick={handleDownload}
                // disabled={!table.getIsSomeRowsSelected()}
                variant="contained"
              >
          
               <Download/>
                <CSVLink filename={`NurseInfo(${csvData.length}).csv`} data={data} headers={headers}>
                  Download me
                </CSVLink>
              </Button>
              <Button
                color="info"
                onClick={handleCreate}
                variant="contained"
              >
               <GroupAdd/> Create new
              </Button>
            </Box>
          </Box>
        </Box>
      );
    },
  });

  return <MaterialReactTable table={table} />;
}
