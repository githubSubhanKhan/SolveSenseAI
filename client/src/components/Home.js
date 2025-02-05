import React, { useState, useEffect } from "react";
import { Box, AppBar, Toolbar, Typography, TextField, Button, Avatar, Container, Paper } from "@mui/material";
import { motion } from "framer-motion";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showInitialText, setShowInitialText] = useState(true);
  const [loading, setLoading] = useState(false); // To manage loading state while fetching/sending data

  const username = localStorage.getItem("username"); // Get username from localStorage

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
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="sticky" sx={{ bgcolor: "primary.main" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">SolveSense AI</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar src="https://via.placeholder.com/100" sx={{ width: 40, height: 40, mr: 1 }} />
            <Typography variant="body1">{username}</Typography>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", overflowY: "auto", justifyContent: messages.length === 0 ? "center" : "flex-start", p: 3 }}>
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
  );
};

export default Home;
