export interface FieldData {
  key: string,
  title: string,
  isEdited: boolean,
  type: "dropdown" | "radio" | "textarea"
  options?: string[]
}

export interface NoteData {
  name: string
  fields: FieldData[]
}

export interface NotesProps {
  notes: NoteData[]
}