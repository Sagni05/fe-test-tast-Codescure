import React, { useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AndroidIcon from "@mui/icons-material/Android";

import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpeciesData } from "../redux/action/userAction";

const SideWindow = ({ row, onClose }) => {
  const dispatch = useDispatch();
  const peopleData = useSelector((state) => state?.user?.peopleData?.results);
  const speciesData = useSelector((state) => state?.user?.speciesData);

  const matchedPerson = peopleData.find((person) => person.name === row.name);
  useEffect(() => {
    if (matchedPerson?.species?.length > 0) {
      const speciesEndPoint = matchedPerson?.species[0]?.split("api/")[1];
      dispatch(fetchSpeciesData(speciesEndPoint));
    }
  }, [matchedPerson]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "300px",
        backgroundColor: "#fff",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        padding: "20px",
        overflowY: "auto",
        zIndex: 9999,
      }}
    >
      <h2>Details</h2>
      {speciesData?.name === "Droid" ? (
        <AndroidIcon />
      ) : speciesData?.name === "Human" ? (
        <AccountCircleIcon />
      ) : (
        <QuestionMarkIcon />
      )}
      <ul
        style={{
          paddingLeft: 0,
          listStyleType: "none",
        }}
      >
        {Object.entries(matchedPerson).map(([key, value]) => (
          <li key={key} style={{ marginBottom: "8px" }}>
            <strong>{key}: </strong> {value}
          </li>
        ))}
      </ul>
      <IconButton
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          },
          "&:active": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default SideWindow;
