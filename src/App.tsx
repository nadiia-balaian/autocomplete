import { useState, useEffect, useRef } from "react";
import "./App.css";
import styled from "styled-components";
import { useDebounce } from "./hooks/useDebounce";
import { getPlanets } from "./api";
import { ErrorComponent } from "./components/ErrorComponent";
import { AutoCompleteInput } from "./components/Autocomplete";
import { DropdownItem } from "./components/DropdownItem";

const Wrapper = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
`;

const Suggestions = styled.ul`
  list-style: none;
  background: #f9f9f9;
  padding: 10px;
  margin: 0;
  border: 1px solid #ccc;
  border-top: none;
`;

function App() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [shouldSearch, setShouldSearch] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const listboxRef = useRef<HTMLUListElement>(null);

  const debouncedValue = useDebounce(value, 500);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      // Clear the results to close the dropdown
      setResults([]);
      setValue("");
    }
  };

  useEffect(() => {
    const searchPlanets = async () => {
      try {
        const res = await getPlanets(debouncedValue);
        setResults(res.results.map((planet) => planet.name));
        console.log(res);
      } catch (e) {
        console.error(e);
        setError("Something went wrong! Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedValue !== "" && shouldSearch) {
      setIsLoading(true);
      setResults([]);
      setError(null);
      searchPlanets();
    }
  }, [debouncedValue]);

  console.log(value);

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
    <Wrapper
      role="combobox"
      aria-haspopup="listbox"
      aria-owns="autocomplete-listbox"
    >
      <h1>Autocomplete</h1>

      <AutoCompleteInput
        value={value}
        onInputChange={onInputChange}
        onKeyDown={onKeyDown}
      />
      {debouncedValue !== "" && shouldSearch ? (
        <Suggestions id="autocomplete-listbox" role="listbox">
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
                />
              ))}
        </Suggestions>
      ) : null}

      {error && <ErrorComponent msg={error} />}
    </Wrapper>
  );
}

export default App;
