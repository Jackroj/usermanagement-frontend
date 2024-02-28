import { formatDate } from "../Utils/helper"

export const userFields = [
    {
      accessorKey: "id", 
      header: "Id",
      muiTableHeadCellProps: { sx: { color: "black" } },
      Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> 
    },
    {
      accessorFn: (row) => row.name, 
      id: "name", 
      header: "Name",
      muiTableHeadCellProps: { sx: { color: "black" } },
      Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> 
    },
    {
      accessorFn: (row) => row.licensenumber, 
      id: "licensenumber", 
      header: "Licensenumber",
      Header: <strong style={{ color: "black" }}>License Number</strong> 
    },
    {
      accessorFn: (row) => formatDate(row.dateofbirth), 
      id: "dateofbirth", 
      header: "dateofbirth",
      Header: <strong style={{ color: "black" }}>Date Of Birth</strong> 
    },
    {
      accessorFn: (row) => row.age, 
      id: "age", 
      header: "Age",
      Header: <strong style={{ color: "black" }}>Age</strong> 
    }
  ]