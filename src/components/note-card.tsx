import * as Dialog from "@radix-ui/react-dialog" 
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { X, Pencil } from "lucide-react"
import { useState } from "react"
import { Note } from "../app" 

interface NoteCardProps {
  note: Note;
  onNoteDelete: (id: string) => void;
  onNoteEdit: (updatedNote: Note) => void; // Função para edição
}

export function NoteCard({ note, onNoteDelete, onNoteEdit }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(note.content)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  

  const handleSaveClick = () => {
    const updatedNote: Note = {
      id: note.id,
      date: new Date(),
      content: editedContent,
    }
    onNoteEdit(updatedNote)
    setIsEditing(false)
  }

  const handleCancelClick = () => {
    setIsEditing(false)
    setEditedContent(note.content)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className='rounded-md text-left flex flex-col bg-slate-600 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus:ring-2 focus:ring-purple-400' >
        <span className='text-sm font-medium text-slate-200'>
          {formatDistanceToNow(note.date,  { locale: ptBR, addSuffix: true })}
        </span>
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className='border rounded-md p-2 mb-2 w-full'
          />
        ) : (
          <p className='text-sm leading-6 text-slate-400'>
            {note.content}
          </p>
        )}
        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-black/0 pointer-events-none'/>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60" />
        <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] w-full bg-slate-700 md:rounded-md flex flex-col outline-none ">
          <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
            <X className="size-5"/>
          </Dialog.Close>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className='text-sm font-medium text-slate-200'>
             {formatDistanceToNow(note.date,  { locale: ptBR, addSuffix: true })}
            </span>
            {isEditing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className='p-2 mb-2 w-full text-slate-300 bg-transparent focus:border-none '
              />
            ) : (
              <p className='text-sm leading-6 text-slate-400'>
                {note.content}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 p-5">
            {isEditing ? (
              <>
                <button onClick={handleSaveClick} className='bg-green-500 text-white px-4 py-2 rounded-md'>
                  Save
                </button>
                <button onClick={handleCancelClick} className='bg-red-500 text-white px-4 py-2 rounded-md'>
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={handleEditClick} className='flex border px-4 py-2 rounded-md '>
                <Pencil className="size-5" /> <p className="text-blue-400 font-inter px-2">Edit</p>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => onNoteDelete(note.id)}
            className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
          >
            Deseja <span className="text-red-400 group-hover:underline">apagar essa nota</span>?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}