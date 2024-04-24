import { useState, useEffect, useRef } from "react";
import "./App.css";
import styled from "styled-components";
import { useDebounce } from "./hooks/useDebounce";
import { getPlanets } from "./api";
import { AutoCompleteInput } from "./components/AutoCompleteInput";
import { DropdownItem } from "./components/DropdownItem";
import { ErrorComponent } from "./components/ErrorComponent";

const Suggestions = styled.ul`
  list-style: none;
  background: #f9f9f9;
  padding: 10px;
  margin: 0;
  border: 1px solid #ccc;
  border-top: none;
  max-height: 30vh;
  overflow-y: auto;
`;

interface AppProps {
  width?: string;
}

function App({ width }: AppProps) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [shouldSearch, setShouldSearch] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const listboxRef = useRef<HTMLUListElement>(null);

  const debouncedValue = useDebounce(value, 500);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prevIndex) => (prevIndex + 1) % results.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex(
          (prevIndex) => (prevIndex - 1 + results.length) % results.length
        );
        break;
      case "Enter":
        onItemSelect(activeIndex);
        break;
    }
  };

  const handleEscape = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      // Clear the results to close the dropdown
      setResults([]);
      setValue("");
    }
  };

  useEffect(() => {
    const search = async () => {
      try {
        const res = await getPlanets(debouncedValue);
        setResults(res.results.map((planet) => planet.name));
      } catch (e: any) {
        console.error(e);
        if (e?.response?.status === 404) {
          setResults([]);
        } else {
          setError("Something went wrong! Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedValue !== "" && shouldSearch) {
      setIsLoading(true);
      setResults([]);
      setError(null);
      search();
    }
  }, [debouncedValue]);

  // Focus the active item when the activeIndex changes for accessibility
  useEffect(() => {
    if (activeIndex !== -1 && listboxRef.current) {
      const listItems = Array.from(listboxRef.current.querySelectorAll("li"));
      listItems[activeIndex].focus();
      setActiveIndex(activeIndex);
    }
  }, [activeIndex]);

  const onItemSelect = (index: number) => {
    setShouldSearch(false);
    setActiveIndex(index);
    setValue(results[index]);
    setResults([]);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShouldSearch(true);
    setValue(e.target.value);
  };

  return (
    <div
      style={{
        width: width || "100%",
      }}
      onKeyDown={results ? handleKeyDown : undefined}
    >
      <AutoCompleteInput
        value={value}
        onInputChange={onInputChange}
        onKeyDown={handleEscape}
      />
      {debouncedValue !== "" && shouldSearch ? (
        <Suggestions id="autocomplete-listbox" role="listbox" ref={listboxRef}>
          {isLoading
            ? "Loading..."
            : results.length === 0
            ? "No results"
            : results.map((result, index) => (
                <DropdownItem
                  key={result}
                  text={result}
                  isActive={index === activeIndex}
                  onSelect={() => onItemSelect(index)}
                  searchValue={debouncedValue}
                  aria-selected={index === activeIndex}
                  tabIndex={index === activeIndex ? 0 : -1}
                />
              ))}
        </Suggestions>
      ) : null}
      {error ? <ErrorComponent message={error} /> : null}
    </div>
  );
}

export default App;
