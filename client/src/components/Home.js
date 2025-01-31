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
                    width: open ? 180 : 50,
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between", // Pushes content apart
                    "& .MuiDrawer-paper": {
                        width: open ? 180 : 50,
                        transition: "width 0.3s",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "10px",
                        justifyContent: "space-between", // Ensures bottom placement
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

                {/* Sidebar Menu */}
                <List sx={{ width: "100%", flexGrow: 1, mt: 2 }}>
                    <ListItem button>
                        <ListItemText primary={open ? "Menu Item 1" : ""} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={open ? "Menu Item 2" : ""} />
                    </ListItem>
                </List>

                {/* User Profile (Aligned like Chat Box) */}
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: open ? "flex-start" : "center", // Adjust alignment
                        mb: 2,
                        px: open ? 2 : 0, // Padding only when sidebar is open
                    }}
                >
                    <Avatar src="https://via.placeholder.com/100" sx={{ width: 40, height: 40 }} />
                    {open && (
                        <Typography variant="body1" sx={{ ml: 2 }}> {/* Added spacing */}
                            John Doe
                        </Typography>
                    )}
                </Box>

            </Drawer>


            {/* Main Content */}
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", p: 3 }}>
                {/* Animated Text */}
                <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
                        <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>
                            Solve all your queries with our AI
                        </Typography>
                    </motion.div>
                </Box>

                {/* Chat Input (Now at the bottom) */}
                <Container maxWidth="md" sx={{ pb: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                        <TextField fullWidth variant="outlined" placeholder="Chat with AI..." sx={{ bgcolor: "white" }} />
                        <Button variant="contained" sx={{ ml: 2 }}>Send</Button>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;
