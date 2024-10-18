import React from "react";
import { ThemeProvider } from "./ThemeContext";
import { ToDoList } from "./toDoList";
import { render, screen, fireEvent } from "@testing-library/react";
import { dummyGroceryList } from "./constants";

describe('ToDoList required Tests', () => {
    test('All Items on List on Screen', () => {
        render(
            <ThemeProvider>
                <ToDoList />
            </ThemeProvider>
        );

        expect(screen.getByText('Items bought: 0')).toBeInTheDocument();

        dummyGroceryList.forEach((item) => { 
          expect(screen.getByText(item.name)).toBeInTheDocument();
        });
    
        const checkboxes = screen.getAllByRole("checkbox");
    });
  

    test('Check all checkboxes one by one and ensure the number of checked items updates correctly', () => {
        render(
            <ThemeProvider>
                <ToDoList />
            </ThemeProvider>
        );
    
        // Start with an expectation of 0 items bought
        expect(screen.getByText('Items bought: 0')).toBeInTheDocument();
        const itemNames = dummyGroceryList.map(item => item.name);
        // Check boxes
        itemNames.forEach((name, index) => {
            const checkbox = screen.getByLabelText(name);
            fireEvent.click(checkbox);
            expect(screen.getByText(`Items bought: ${index + 1}`)).toBeInTheDocument();
        });
        // Uncheck Boxes
        itemNames.forEach((name, index) => {
            const checkbox = screen.getByLabelText(name);
            fireEvent.click(checkbox);
            expect(screen.getByText(`Items bought: ${itemNames.length - index - 1}`)).toBeInTheDocument();
        });
    });
  });
  
  