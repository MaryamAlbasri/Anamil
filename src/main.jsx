
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext.jsx";
import App from "./App.jsx";
import "./index.css";
// AI Assistance: ChatGPT helped integrate BookingProvider
// into the application without changing the existing routes.

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <BookingProvider>
                <App />
            </BookingProvider>
        </BrowserRouter>
    </StrictMode>
);
