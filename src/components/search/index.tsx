interface Props {
  search: string;
  setSearch: (value: string) => void;
  handleSearch: () => void
}
export default function Search({ search, setSearch, handleSearch }: Props) {
  return (
    <div className="search-engine">
      <input
        type="text"
        placeholder="Enter City Name"
        name="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
