import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { ThemeProvider } from "./ThemeContext";

test("renders Create Note", () => {
 render(
   <BrowserRouter>
    
    <ThemeProvider>
    <App />
    </ThemeProvider>
   </BrowserRouter>
 );
 const createNoteElement = screen.getByText(/Create Note/i);
 expect(createNoteElement).toBeInTheDocument();
});
