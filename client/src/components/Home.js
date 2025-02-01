import React, { useState } from "react";
import { Box, Drawer, List, ListItem, ListItemText, IconButton, Typography, TextField, Button, Avatar, Container, Paper } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { motion } from "framer-motion";

const Home = () => {
    const [open, setOpen] = useState(true);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [showInitialText, setShowInitialText] = useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const sendMessage = () => {
        if (input.trim() !== "") {
            if (showInitialText) setShowInitialText(false);
            
            const newMessages = [
                ...messages,
                { text: input, sender: "user" },
                { text: "This is an AI response!", sender: "ai" },
            ];
            setMessages(newMessages);
            setInput("");
        }
    };

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: open ? 180 : 50,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: open ? 180 : 50,
                        transition: "width 0.3s",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "10px",
                        justifyContent: "space-between",
                    },
                }}
            >
                <IconButton onClick={toggleDrawer} sx={{ alignSelf: "flex-end" }}>
                    {open ? <ChevronLeft /> : <ChevronRight />}
                </IconButton>
                <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
                    <Typography variant="h6">Logo</Typography>
                </Box>
                <List sx={{ width: "100%", flexGrow: 1, mt: 2 }}>
                    <ListItem button>
                        <ListItemText primary={open ? "Menu Item 1" : ""} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={open ? "Menu Item 2" : ""} />
                    </ListItem>
                </List>
                <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: open ? "flex-start" : "center", mb: 2, px: open ? 2 : 0 }}>
                    <Avatar src="https://via.placeholder.com/100" sx={{ width: 40, height: 40 }} />
                    {open && (
                        <Typography variant="body1" sx={{ ml: 2 }}>
                            John Doe
                        </Typography>
                    )}
                </Box>
            </Drawer>
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", p: 3 }}>
                <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", overflowY: "auto", justifyContent: messages.length === 0 ? "center" : "flex-start" }}>
                    {showInitialText && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
                            <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>
                                Solve all your queries with our AI
                            </Typography>
                        </motion.div>
                    )}
                    {messages.map((msg, index) => (
                        <Paper
                            key={index}
                            sx={{
                                p: 2,
                                m: 1,
                                maxWidth: "70%",
                                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                                bgcolor: msg.sender === "user" ? "#1976D2" : "#E3F2FD",
                                color: msg.sender === "user" ? "white" : "black",
                                borderRadius: "10px",
                            }}
                        >
                            {msg.text}
                        </Paper>
                    ))}
                </Box>
                <Container maxWidth="md" sx={{ pb: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                        <TextField fullWidth variant="outlined" placeholder="Chat with AI..." value={input} onChange={(e) => setInput(e.target.value)} sx={{ bgcolor: "white" }} />
                        <Button variant="contained" sx={{ ml: 2 }} onClick={sendMessage}>
                            Send
                        </Button>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;