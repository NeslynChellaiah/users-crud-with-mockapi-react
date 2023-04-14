import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import "./App.css";
import { UserCard } from "./user-card/UserCard";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useState } from "react";
import UserForm from "./user-form/UserForm";

function Dashboard() {
  const [users, setUsers] = useState();
  useEffect(() => {
    fetch("https://6435782f83a30bc9ad61b778.mockapi.io/users/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="App">
      {!users?.length && (
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{ display: "flex", justifyContent: "center" }}
        >
          Click the plus icon to add users
        </Typography>
      )}
      <Grid container spacing={2}>
        {users?.map(({ userName, email, profile, id }) => (
          <Grid item xs={6} sm={4} md={3} key={id + "grid"}>
            <UserCard
              key={id}
              userName={userName}
              email={email}
              profile={profile}
              id={id}
            />
          </Grid>
        ))}
      </Grid>
      <Link to={`/create-user`}>
        <div className="fab">
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </Link>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
      </Modal> */}
    </div>
  );
}
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/users" element={<Dashboard />}>
            {/* <Route index element={<MovieList />} />*/}
          </Route>
          <Route
            path="/create-user"
            element={<UserForm editMode={false} />}
          ></Route>
          <Route
            path="/edit-user/:id"
            element={<UserForm editMode={true} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
