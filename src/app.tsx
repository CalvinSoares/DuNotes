import logoo from './assets/logoo.svg'
import { ChangeEvent, useState } from 'react'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

export interface Note {
  id: string 
  date: Date
  content: string
}

export function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }

    return []
  })

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function onNoteDeleted(id: string) {
    const notesArray = notes.filter(note => note.id !== id)

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value

    setSearch(query)
  }

  function onNoteEdited(updatedNote: Note) {
    const updatedNotes = notes.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    )

    setNotes(updatedNotes)

    localStorage.setItem('notes', JSON.stringify(updatedNotes))
  }

  const filteredNotes = search !== ''
    ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : notes

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6 px-5'>
      <img src={logoo} alt="logo duNotes" />
      
      <form className='w-full'>
        <input 
        type='text' 
        placeholder='Busque em suas notas...' 
        className='bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500 focus:border-b'
        onChange={handleSearch}
        />
      </form>

      <div className='h-px bg-slate-700'/>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]'>
        <NewNoteCard onNoteCreated={onNoteCreated}/>
           
        {filteredNotes.map(note => (
          <NoteCard 
            key={note.id} 
            note={note} 
            onNoteDelete={onNoteDeleted}
            onNoteEdit={onNoteEdited} // Passando a função de edição para o componente NoteCard
          />
        ))}                        
      </div>
    </div>    
  ) 
}