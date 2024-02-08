import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import TableSearch from "../components/TableSearch";
import SideWindow from "../components/SideWindow";

export default function DataTable({
  columns,
  rows,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  setPage,
  isLoading,
  countData,
  handleSearch,
  searchValue,
}) {
  rows, "test31";
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortedRows, setSortedRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    setSortedRows([...rows]);
  }, [rows]);

  const handleSort = (columnId) => {
    const isAsc = sortColumn === columnId && sortDirection === "asc";
    setSortColumn(columnId);
    setSortDirection(isAsc ? "desc" : "asc");

    const sorted = [...sortedRows].sort((a, b) => {
      if (a[columnId] < b[columnId]) return isAsc ? -1 : 1;
      if (a[columnId] > b[columnId]) return isAsc ? 1 : -1;
      return 0;
    });

    setSortedRows(sorted);
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleCloseWindow = () => {
    setSelectedRow(null);
  };

  return (
    <Paper>
      <Box
        sx={{
          height: "85vh",
          overflow: "auto",
          width: "100%",
          overflowY: "hidden",
          overflowX: "hidden",
          borderRadius: "10px",
        }}
      >
        <h1>Task By:Shubham Agnihotri</h1>
        <TableSearch handleSearch={handleSearch} searchValue={searchValue} />
        <TableContainer
          sx={{
            maxHeight: "100%",
            border: "1px solid rgba(84, 94, 104, 0.20)",
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={`${column.id}-${index}`}
                    align={column.align}
                    sx={{
                      minWidth: column.minWidth,
                      backgroundColor: "#1B2835",
                      color: "#FFFF",
                      fontSize: "15px",
                      padding: "20px 20px",
                      fontWeight: "600",
                      letterSpacing: "0.17px",
                      boxShadow: "0px -1px 0px 0px rgba(0, 0, 0, 0.12) inset",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSort(column.id)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span>{column.label}</span>
                      {sortColumn === column.id && (
                        <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <AnimatePresence>
                {isLoading ? (
                  <motion.tr key="loading">
                    <TableCell colSpan={columns.length} align="center">
                      <CircularProgress sx={{ color: "#1B2835" }} />
                    </TableCell>
                  </motion.tr>
                ) : sortedRows.length === 0 ? (
                  <motion.tr key="no-data2">
                    <TableCell colSpan={columns.length} align="center">
                      No Data Found
                    </TableCell>
                  </motion.tr>
                ) : (
                  sortedRows.map((row, index) => (
                    <motion.tr
                      key={`${row.userId}-${index}`}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      onClick={() => handleRowClick(row)} // Add row click handler
                      sx={{
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#f0f0f0" },
                        "&:active": { backgroundColor: "#c0c0c0" },
                      }} // Apply cursor pointer and hover effect to rows
                    >
                      {columns.map((column, index) => (
                        <TableCell
                          className="table-height"
                          key={`${column.id}-${index}`}
                          align={column.align}
                          sx={{ cursor: "pointer" }}
                        >
                          <div>{row[column.id]}</div>
                        </TableCell>
                      ))}
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <TablePagination
        component="div"
        count={countData ? countData : 0}
        rowsPerPageOptions={[10, 25, 50, 100]}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {selectedRow && (
        <SideWindow row={selectedRow} onClose={handleCloseWindow} />
      )}
    </Paper>
  );
}
