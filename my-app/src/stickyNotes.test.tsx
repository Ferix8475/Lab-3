import { render, screen, fireEvent, within } from "@testing-library/react";
import React from "react";
import { StickyNotes } from "./stickyNotes";
import { ThemeProvider } from "./ThemeContext";

describe("Create StickyNote", () => {
 test("renders create note form", () => {
    render(
        <ThemeProvider>
            <StickyNotes />
        </ThemeProvider>
    );

   const createNoteButton = screen.getByText("Create Note");
   expect(createNoteButton).toBeInTheDocument();
 });

 test("creates a new note", () => {
    render(
        <ThemeProvider>
            <StickyNotes />
        </ThemeProvider>
    );
// Please make sure your sticky note has a title and content input field with the following placeholders.
   const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
   const createNoteContentTextarea =
     screen.getByPlaceholderText("Note Content");
   const createNoteButton = screen.getByText("Create Note");

   fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
   fireEvent.change(createNoteContentTextarea, {
     target: { value: "Note content" },
   });
   fireEvent.click(createNoteButton);

   const newNoteTitle = screen.getByText("New Note");
   const newNoteContent = screen.getByText("Note content");

   expect(newNoteTitle).toBeInTheDocument();
   expect(newNoteContent).toBeInTheDocument();
 });
});

describe('Required Tests for StickyNotes', () => {
    
    test('should update the note after editing', () => {
        render(
            <ThemeProvider>
                <StickyNotes />
            </ThemeProvider>
        );      
        fireEvent.change(screen.getByPlaceholderText('Note Title'), { target: { value: 'Test note' } });
        fireEvent.change(screen.getByPlaceholderText('Note Content'), { target: { value: 'Edit me' } });
        fireEvent.click(screen.getByText('Create Note'));
        
        // Find the correct edit button
        const noteTitle = screen.getByText('Test note');
        const noteContainer = noteTitle.closest('.note-item');
        const buttonsContainer = noteContainer.querySelector('.notes-header');
        const editButton = within(buttonsContainer).getByText('Edit');
        fireEvent.click(editButton);
        
        // Edit the note
        const title = screen.getByText('Test note');
        fireEvent.blur(title, { target: { textContent: 'Updated Note Title' } });
        
        const content = screen.getByText('Edit me');
        fireEvent.blur(content, { target: { textContent: 'Updated content' } });
        
        fireEvent.click(screen.getByText('Save'));
      
        expect(screen.getAllByText('Updated Note Title')).toHaveLength(2);
        expect(screen.getByText('Updated content')).toBeInTheDocument();
        expect(screen.queryByText("Test note")).not.toBeInTheDocument();
        expect(screen.queryByText("Edit me")).not.toBeInTheDocument();

      });


      test('should delete note from screen', () => {
        render(
            <ThemeProvider>
                <StickyNotes />
            </ThemeProvider>
        );      
        fireEvent.change(screen.getByPlaceholderText('Note Title'), { target: { value: 'Test note' } });
        fireEvent.change(screen.getByPlaceholderText('Note Content'), { target: { value: 'Delete me' } });
        fireEvent.click(screen.getByText('Create Note'));
        
        // Find the correct delete button
        const noteTitle = screen.getByText('Test note');
        const noteContainer = noteTitle.closest('.note-item');
        const buttonsContainer = noteContainer.querySelector('.notes-header');
        const deleteButton = within(buttonsContainer).getByText('x');
        fireEvent.click(deleteButton);
        

        // Should not be anywhere on the screen
        expect(screen.queryByText("Test note")).not.toBeInTheDocument();
        expect(screen.queryByText("Delete me")).not.toBeInTheDocument();
    });
  });
  
  describe('Extra Tests for StickyNotes', () => {
    
    test('Like and Delete note, gone from screen', () => {
        render(
            <ThemeProvider>
                <StickyNotes />
            </ThemeProvider>
        );      
        fireEvent.change(screen.getByPlaceholderText('Note Title'), { target: { value: 'Test note' } });
        fireEvent.change(screen.getByPlaceholderText('Note Content'), { target: { value: 'Cse 110' } });
        fireEvent.click(screen.getByText('Create Note'));
        
        // Find the correct like and delete button
        const noteTitle = screen.getByText('Test note');
        const noteContainer = noteTitle.closest('.note-item');
        const buttonsContainer = noteContainer.querySelector('.notes-header');
        const likeButton = within(buttonsContainer).getByText('🤍');
        const deleteButton = within(buttonsContainer).getByText('x');
        fireEvent.click(likeButton);
        fireEvent.click(deleteButton);
       

        expect(screen.queryByText("Test note")).not.toBeInTheDocument();
        expect(screen.queryByText("Cse 110")).not.toBeInTheDocument();

      });


      test('Favorites title changes after edit is made', () => {
        render(
            <ThemeProvider>
                <StickyNotes />
            </ThemeProvider>
        );      
        fireEvent.change(screen.getByPlaceholderText('Note Title'), { target: { value: 'Test note' } });
        fireEvent.change(screen.getByPlaceholderText('Note Content'), { target: { value: 'Cse 110' } });
        fireEvent.click(screen.getByText('Create Note'));
        const title = screen.getByText('Test note');

         // Find the correct like and delete button
         const noteTitle = screen.getByText('Test note');
         const noteContainer = noteTitle.closest('.note-item');
         const buttonsContainer = noteContainer.querySelector('.notes-header');
         const likeButton = within(buttonsContainer).getByText('🤍');
         const editButton = within(buttonsContainer).getByText('Edit');
         fireEvent.click(likeButton);
        
         fireEvent.click(editButton);
        fireEvent.blur(title, { target: { textContent: 'Updated Note Title' } });
        
        const content = screen.getByText('Cse 110');
        fireEvent.blur(content, { target: { textContent: 'Updated content' } });
        
        fireEvent.click(screen.getByText('Save'));
      
        expect(screen.getAllByText('Updated Note Title')).toHaveLength(2);
        expect(screen.getByText('Updated content')).toBeInTheDocument();
        expect(screen.queryByText("Test note")).not.toBeInTheDocument();
        expect(screen.queryByText("Cse 110")).not.toBeInTheDocument();
    });
  });