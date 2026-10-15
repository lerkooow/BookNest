import { Book, initialBooks } from "@/app/mockData";
import { useMemo, useState } from "react";

export const statusTabs = [
  { id: "all", label: "All" },
  { id: "finished", label: "Finished" },
  { id: "reading", label: "Currently Reading" },
  { id: "want", label: "Want to Read" },
];

export const useLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedGenre, setSelectedGenre] = useState<string>("All Genres");
  const [sortBy, setSortBy] = useState<string>("Newest");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Filter and Sort books logic
  const filteredBooks = useMemo(() => {
    return initialBooks
      .filter((book) => {
        const matchesSearch =
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
          selectedStatus === "all" || book.status === selectedStatus;
        const matchesGenre =
          selectedGenre === "All Genres" || book.genre === selectedGenre;
        return matchesSearch && matchesStatus && matchesGenre;
      })
      .sort((a, b) => {
        if (sortBy === "Newest") {
          return (
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
          );
        } else if (sortBy === "Rating: High to Low") {
          return b.rating - a.rating;
        } else if (sortBy === "Title: A to Z") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [searchQuery, selectedStatus, selectedGenre, sortBy]);

  const getStatusBadge = (status: Book["status"]) => {
    switch (status) {
      case "finished":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
            Finished
          </span>
        );
      case "reading":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-600">
            Currently Reading
          </span>
        );
      case "want":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-500">
            Want to Read
          </span>
        );
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    selectedGenre,
    setSelectedGenre,
    sortBy,
    setSortBy,
    isDarkMode,
    setIsDarkMode,
    filteredBooks,
    getStatusBadge,
  };
};
