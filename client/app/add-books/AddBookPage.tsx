"use client";

import { Notes } from "./components/Notes";
import { ErrorModal } from "@/components/ui/ErrorModal";

import { useAddBooks } from "@/app/add-books/hooks/useAddBooks";
import { AddCover } from "./components/AddCover";
import { BookDetails } from "./components/BookDetails";
import { GenreDropdown } from "./components/GenreDropdown";
import { StatusDropdown } from "./components/StatusDropdown";
import { Rating } from "./components/Rating";
import { Description } from "./components/Description";
import { ActionsButtons } from "./components/ActionsButtons";

export const AddBookPage = () => {
  const {
    title,
    setTitle,
    author,
    setAuthor,
    genre,
    setGenre,
    status,
    handleStatusChange,
    rating,
    setRating,
    hoverRating,
    setHoverRating,
    description,
    setDescription,
    notes,
    setNotes,
    coverUrl,
    setCoverUrl,
    saving,
    error,
    handleSubmit,
  } = useAddBooks();
  return (
    <div
      className={`min-h-screen bg-[#FCFCF9] text-neutral-800 transition-colors duration-200`}
    >
      <div className="w-full p-8 ">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
            Add a New Book
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Fill in the details to add a book to your library.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <AddCover coverUrl={coverUrl} setCoverUrl={setCoverUrl} />
            <div className="md:col-span-7 flex flex-col gap-5">
              <BookDetails
                title={title}
                setTitle={setTitle}
                author={author}
                setAuthor={setAuthor}
              />
              <GenreDropdown genre={genre} setGenre={setGenre} />
              <StatusDropdown
                status={status}
                handleStatusChange={handleStatusChange}
              />
              <Rating
                rating={rating}
                setRating={setRating}
                hoverRating={hoverRating}
                setHoverRating={setHoverRating}
              />
              <Description
                description={description}
                setDescription={setDescription}
              />
              <Notes notes={notes} setNotes={setNotes} />
            </div>
          </div>

          <ActionsButtons saving={saving} />
        </form>
      </div>
      <ErrorModal key={error} message={error} />
    </div>
  );
};
