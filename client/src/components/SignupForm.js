import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomAlert from "./Alert"; // Import the Alert component

const SignupForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [alert, setAlert] = useState({ open: false, message: "", severity: "error" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlert({ open: false, message: "", severity: "error" });

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setAlert({ open: true, message: "User registered successfully!", severity: "success" });
            setTimeout(() => navigate("/login"), 2000); // Redirect after 2 sec
        } catch (err) {
            setAlert({ open: true, message: err.message, severity: "error" });
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                }}
            >
                <Typography variant="h2" gutterBottom>
                    Signup
                </Typography>
                <CustomAlert open={alert.open} onClose={() => setAlert({ ...alert, open: false })} message={alert.message} severity={alert.severity} />
                
                <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        type="password"
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", mt: 2 }}>
                        <Button type="submit" variant="contained" color="primary">
                            Create Account
                        </Button>
                        <Button variant="text" color="secondary" onClick={() => navigate("/login")}>
                            Already have an account?
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default SignupForm;
