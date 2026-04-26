'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useState } from 'react';
import { NoteList } from '@/components/NoteList/NoteList';
import css from './NotesPage.module.css';
import { getNotes } from '@/lib/api';
import { Modal } from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';
import Pagination from '@/components/Pagination/Pagination';

export default function NotesClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

 const handleSearch = useDebouncedCallback((nextSearchQuery: string) => {
  setSearchQuery(nextSearchQuery);
  setCurrentPage(1);
}, 300);
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['notes', searchQuery, currentPage],
    queryFn: () => getNotes(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });
    
if (isError) {
  throw error;
}

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox text={searchQuery} onSearch={handleSearch}/>
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
          <button className={css.button} onClick={openModal}>Create note +</button>
          {isModalOpen && <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal}/>
          </Modal>}
        </header>
        {isLoading && <p>Loading...</p>}
        {notes.length !== 0 && <NoteList notes={notes} />}
      </div>
    </>
  );
  
}