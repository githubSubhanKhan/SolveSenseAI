import React, { useState } from "react";
import { Box, Drawer, List, ListItem, ListItemText, IconButton, Typography, TextField, Button, Avatar, Container } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { motion } from "framer-motion";

const Home = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: open ? 240 : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? 240 : 60,
            transition: "width 0.3s",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
          },
        }}
      >
        {/* Toggle Button */}
        <IconButton onClick={toggleDrawer} sx={{ alignSelf: "flex-end" }}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>

        {/* Website Logo */}
        <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
          <Typography variant="h6">Logo</Typography>
        </Box>

        {/* User Profile */}
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Avatar
            src="https://via.placeholder.com/100"
            sx={{ width: 60, height: 60, mx: "auto" }}
          />
          {open && (
            <Typography variant="body1" sx={{ mt: 1 }}>
              John Doe
            </Typography>
          )}
        </Box>

        {/* Sidebar Menu */}
        <List sx={{ width: "100%", mt: 2 }}>
          <ListItem button>
            <ListItemText primary={open ? "Menu Item 1" : ""} />
          </ListItem>
          <ListItem button>
            <ListItemText primary={open ? "Menu Item 2" : ""} />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 3 }}>
        {/* Animated Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>
            Solve all your queries with our AI
          </Typography>
        </motion.div>

        {/* Chat Input */}
        <Container maxWidth="md" sx={{ mt: 5 }}>
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Chat with AI..."
              sx={{ bgcolor: "white" }}
            />
            <Button variant="contained" sx={{ ml: 2 }}>
              Send
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
