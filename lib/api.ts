import axios from "axios";
import type { Note } from "./types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

interface NotesResponse { 
    notes: Note[];
    totalPages: number;
};

export const getNotes = async (searchText: string, page: number = 1 ) => {
    const res = await axios.get<NotesResponse>("/notes", {
        params: {
            page,
            perPage: 12,
            search: searchText,
        }
    });
    return res.data;
};

export interface NewNote {
  title: string,
  content: string,
  tag: string,
};

export const createNote = async (newNote: NewNote) => {
    const res = await axios.post<Note>("/notes", newNote);
    return res.data;
};

export const deleteNote = async (id: string) => {
    const res = await axios.delete<Note>(`/notes/${id}`);
    return res.data;
};

export const fetchNoteById = async (id: string) => {
    const res = await axios.get<Note>(`/notes/${id}`);
    
    return res.data;
 };