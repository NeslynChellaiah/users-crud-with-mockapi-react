import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function UserCard({ userName, email, profile, id }) {
  const navigate = useNavigate();
  return (
    <Card
      sx={{ minWidth: "100%", border: "1px solid" }}
      onClick={() => {
        navigate(`/edit-user/${id}`);
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={profile?.img}
          alt={userName}
          sx={{ objectFit: "contain" }}
        />
        <CardContent
          sx={{
            backgroundColor: "lightgrey",
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            Name: {userName}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            Email: {email}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
