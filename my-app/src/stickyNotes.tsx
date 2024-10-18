import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { LikeList }  from "./favorites";
import React, { useContext, useState } from 'react';
import { ThemeContext, useTheme } from './ThemeContext';

export const StickyNotes = () => {

    const [favorites, setFavorites] = useState<string[]>([]);

    const toggleFavorite = (noteTitle: string) => {
        if (favorites.includes(noteTitle)) {
            const updatedFavorites = favorites.filter(title => title !== noteTitle);
            setFavorites(updatedFavorites);
        } else {
            const updatedFavorites = [...favorites, noteTitle];
            setFavorites(updatedFavorites);
        }
    };
  
  
    const [notes, setNotes] = useState(dummyNotesList); 
    const initialNote = {
        id: -1,
        title: "",
        content: "",
        label: Label.other,
    };
    const [createNote, setCreateNote] = useState(initialNote);
  
    const createNoteHandler = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("title: ", createNote.title);
        console.log("content: ", createNote.content);
        createNote.id = notes.length + 1;
        setNotes([createNote, ...notes]);
        setCreateNote(initialNote);
    };
  
    const deleteNoteHandler = (noteId: number) => {
        const noteToDelete = notes.find(note => note.id === noteId);
        
        const updatedNotes = notes.filter(note => note.id !== noteId); 
        setNotes(updatedNotes); 
    
        if (noteToDelete) {
        const updatedFavorites = favorites.filter(title => title !== noteToDelete.title);
        setFavorites(updatedFavorites); 
        }
    };

    const handleEditNote = (noteID, updatedTitle, updatedContent) => {
        const oldNote = notes.find(note => note.id === noteID);
        
        if (!oldNote) {
            console.error('Old note not found for ID:', noteID);
            return; 
        }
    
        const isTitleChanged = oldNote.title !== updatedTitle;
    
        if (isTitleChanged) {
            setFavorites(prevFavorites => prevFavorites.filter(fav => fav !== oldNote.title));
    
            if (!favorites.includes(updatedTitle)) {
                setFavorites(prevFavorites => [...prevFavorites, updatedTitle]);
            }
        }
    
        const updatedNotes = notes.map(note => 
            note.id === noteID ? { ...note, title: updatedTitle, content: updatedContent } : note
        );
        setNotes(updatedNotes);
    };
    


  
  
    const [selectedNote, setSelectedNote] = useState<Note>(initialNote);
    const { theme, toggleTheme } = useTheme(); // Use the theme context
  
    
    return (
      <div className={`app-container ${theme}`}>
        <div>
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        <form className="note-form" onSubmit={createNoteHandler}>
  
            <input
              placeholder="Note Title"
              onChange={(event) =>
              {
                const title = event.target.value;
  
                // Check if the title exceeds 50 characters
                if (title.length > 50) {
                  alert('Title cannot exceed 50 characters!');
                }
                setCreateNote({ ...createNote, title: event.target.value })}}
              required>
            </input>
          
    
          
            <textarea
                placeholder="Note Content"
              onChange={(event) =>
                setCreateNote({ ...createNote, content: event.target.value })}
              required>
            </textarea>
          
    
      
           <select
             onChange={(event) =>
              setCreateNote({ ...createNote, label: event.target.value as Label })}
              required>
             <option value={Label.personal}>Personal</option>
             <option value={Label.study}>Study</option>
             <option value={Label.work}>Work</option>
             <option value={Label.other}>Other</option>
           </select>
         
    
          <div><button type="submit">Create Note</button></div>
          <LikeList favorites={favorites} />
        </form>
        </div>
        <div className="notes-grid">
        {notes.map((note) => (
    <div key={note.id} className="note-item" >
      <div className="notes-header">
        <button className={'notebutton'} onClick={() => toggleFavorite(note.title)} >
          {favorites.includes(note.title) ? '❤️' : '🤍'}
        </button>
        <button className={'notebutton'} onClick={() => setSelectedNote(note)}>Edit</button>
        <button className={'notebutton'} onClick={() => deleteNoteHandler(note.id)}>x</button>
      </div>
      
      {selectedNote.id === note.id ? (
        <div>
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              const updatedTitle = e.currentTarget.textContent || "";
              setSelectedNote({ ...selectedNote, title: updatedTitle });
            }}
          >
            {selectedNote.title}
          </h2>
          
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              const updatedContent = e.currentTarget.textContent || "";
              setSelectedNote({ ...selectedNote, content: updatedContent });
            }}
          >
            {selectedNote.content}
          </p>
  
          <select
            value={selectedNote.label}
            onChange={(e) =>
              setSelectedNote({ ...selectedNote, label: e.target.value as Label })
            }
          >
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
  
          <button className={'notebutton'}
            onClick={() => {
              const updatedNotes = notes.map((n) => 
                n.id === selectedNote.id ? selectedNote : n
              );
              handleEditNote(note.id, selectedNote.title, selectedNote.content);

              setNotes(updatedNotes);
              setSelectedNote(initialNote); // Reset selectedNote after saving
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <h2 className={`content${theme}`}>{note.title}</h2>
          <p className={`content${theme}`}>{note.content}</p>
          <p className={`content${theme}`}>{note.label}</p>
        </div>
      )}
    </div>
  ))}
        </div>
      </div>  );
    
}