import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UserForm({ editMode }) {
  const [currentImgSrc, setCurrentImgSrc] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentFirstName, setCurrentFirstName] = useState("");
  const [currentLastName, setCurrentLastName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editMode) {
      fetch(`https://6435782f83a30bc9ad61b778.mockapi.io/users/users/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setCurrentUserName(data.userName);
          setCurrentEmail(data.email);
          setCurrentFirstName(data.profile[0].firstName);
          setCurrentLastName(data.profile[0].lastName);
          setCurrentImgSrc(data.profile[0].img);
        });
    }
  }, [editMode, id]);

  const saveUser = async (event) => {
    event.preventDefault();
    await fetch(
      "https://6435782f83a30bc9ad61b778.mockapi.io/users/users" +
        (editMode ? "/" + id : ""),
      {
        method: editMode ? "PUT" : "POST",
        body: JSON.stringify({
          userName: currentUserName,
          email: currentEmail,
          profile: [
            {
              firstName: currentFirstName,
              lastName: currentLastName,
              img: currentImgSrc,
            },
          ],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    navigate("/users");
  };

  const deleteUser = async () => {
    await fetch(
      `https://6435782f83a30bc9ad61b778.mockapi.io/users/users/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    navigate("/users");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    p: 4,
  };
  return (
    <Box sx={style}>
      <form onSubmit={saveUser}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {editMode ? "Edit" : "Add"} user
        </Typography>
        <TextField
          label="Image url"
          type="text"
          variant="standard"
          value={currentImgSrc}
          onChange={(e) => setCurrentImgSrc(e.target.value)}
          fullWidth
          required
          sx={{ mt: 1 }}
        />
        <TextField
          label="Username"
          type="text"
          variant="standard"
          value={currentUserName}
          fullWidth
          required
          sx={{ mt: 1 }}
          onChange={(e) => {
            setCurrentUserName(e.target.value);
          }}
        />
        <TextField
          label="First name"
          type="text"
          variant="standard"
          value={currentFirstName}
          fullWidth
          required
          sx={{ mt: 1 }}
          onChange={(e) => {
            setCurrentFirstName(e.target.value);
          }}
        />
        <TextField
          label="Last name"
          type="text"
          variant="standard"
          value={currentLastName}
          fullWidth
          required
          sx={{ mt: 1 }}
          onChange={(e) => {
            setCurrentLastName(e.target.value);
          }}
        />
        <TextField
          label="Email"
          type="email"
          variant="standard"
          value={currentEmail}
          fullWidth
          required
          sx={{ mt: 1 }}
          onChange={(e) => setCurrentEmail(e.target.value)}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          {!editMode ? "Add User" : "Update User"}
        </Button>
        {editMode && (
          <Button
            onClick={deleteUser}
            type="button"
            variant="outlined"
            sx={{ mt: 2, ml: 2 }}
          >
            Delete user
          </Button>
        )}
      </form>
    </Box>
  );
}
