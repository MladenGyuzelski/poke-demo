import { useCallback } from "react";

type Props = {
  defaultValue: string;
  onSearch: (search: string) => void;
}

const SearchBox = ({ onSearch, defaultValue }: Props) => {

  const filterPokemon = useCallback((event: any) => {
    const { search: { value } } = event.target;
    onSearch(value);
    event.preventDefault();
  }, [onSearch]);

  return (
    <form onSubmit={filterPokemon}>
      <div className="form-control m-2">
        <div className="input-group">
          <input type="text" name="search" placeholder="Search…" className="input input-bordered" defaultValue={defaultValue} />
          <button className="btn btn-square">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBox;