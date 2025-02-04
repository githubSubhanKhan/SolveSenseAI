import React, { useState, useEffect } from "react";
import { Box, Drawer, IconButton, Typography, TextField, Button, Avatar, Container, Paper } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { motion } from "framer-motion";

const Home = () => {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showInitialText, setShowInitialText] = useState(true);
  const [loading, setLoading] = useState(false); // To manage loading state while fetching/sending data

  const username = localStorage.getItem("username"); // Get username from localStorage

  // Toggle drawer
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Fetch previous chat history on component mount
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}chat/fetch-chats?username=${username}`);
        const data = await response.json();
        if (data.chats) {
          const previousMessages = data.chats.map(chat => [
            { text: chat.prompt, sender: "user" },
            { text: chat.response, sender: "ai" },
          ]).flat();
          setMessages(previousMessages);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, [username]);

  // Send new message
  const sendMessage = async () => {
    if (input.trim() !== "") {
      if (showInitialText) setShowInitialText(false);
      
      const newMessages = [
        ...messages,
        { text: input, sender: "user" },
      ];
      setMessages(newMessages);
      setInput("");
      setLoading(true); // Start loading while waiting for the AI response

      try {
        // Make API call to send message and get AI response
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}chat/send-message`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, prompt: input }),
        });

        const data = await response.json();
        if (data.chat && data.chat.response) {
          // Add AI response to the messages list
          const aiResponse = { text: data.chat.response, sender: "ai" };
          setMessages(prevMessages => [...prevMessages, aiResponse]);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setLoading(false); // Stop loading after the response is received
      }
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: open ? 150 : 50,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? 140 : 50,
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
        <Box sx={{ width: "100%", textAlign: "center"}}>
          <Typography variant="h6">Logo</Typography>
        </Box>
        <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: open ? "flex-start" : "center", mb: 2, px: open ? 2 : 0 }}>
          <Avatar src="https://via.placeholder.com/100" sx={{ width: 40, height: 40 }} />
          {open && (
            <Typography variant="body1" sx={{ ml: 2 }}>
              {username} {/* Display username */}
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
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Chat with AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={{ bgcolor: "white" }}
            />
            <Button variant="contained" sx={{ ml: 2 }} onClick={sendMessage} disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
