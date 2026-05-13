import { useEffect, useState } from "react";
import "./SearchBar.css";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  function clearSearch() {
    setQuery("");
    onSearch("");
  }

  useEffect(() => {
    if (!query) {
      onSearch("");
      return;
    }

    const controller = new AbortController();

    const delay = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => {
      clearTimeout(delay);
      controller.abort();
    };
  }, [query]);

  return (
    <div className="search-form">
      <input
        className="search-input"
        type="text"
        placeholder="🔎 Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <button className="clear-button" onClick={clearSearch}>
          ✖
        </button>
      )}
    </div>
  );
}