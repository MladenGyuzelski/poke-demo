import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import Pokemon from "../components/Pokemon";
import SearchBox from "../components/SearchBox";
import usePokemonList from "../hooks/usePokemonList";

function PokeList() {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!params.search) {
      setFilter('');
    }
  }, [params.search]);
  
  const pageSize = 25;

  const { pokemonList, loading } = usePokemonList();

  const [currentPage, setCurrentPage] = useState(parseInt(params?.page || '') - 1 || 0);
  const [filter, setFilter] = useState(params?.search || '');
  const filteredPokemonList = useMemo(() => 
    pokemonList?.filter(pokemon => pokemon.name.includes(filter))
  , [
    pokemonList,
    filter
  ]);

  const filterPokemon = useCallback((search: string) => {
    setFilter(search);
    setCurrentPage(0);
    navigate(`/list/1/${search}`);
  }, [navigate]);
  
  const pageCount = Math.ceil((filteredPokemonList?.length || 0) / pageSize);

  const changePage = useCallback((page: number) => {
    setCurrentPage(page);
    navigate(`/list/${page + 1}/${filter}`);
  }, [navigate, filter]);

  const pokeListCurrentPage = filteredPokemonList?.slice(currentPage * pageSize, currentPage * pageSize + pageSize )

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-xl px-4 mx-auto md:px-8">
        <div className="flex flex-wrap justify-center">
          <SearchBox defaultValue={filter} onSearch={filterPokemon}/>
        </div>
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          onChangePage={changePage}
          />
        <div className="flex flex-wrap justify-center">
          {loading ? (
            <div className="w-full max-w-sm">
              <div className="text-center py-12">
                <div className="text-3xl">Loading...</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pokeListCurrentPage.map((pokemon) => (
              <Pokemon key={pokemon.name} {...pokemon} />
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokeList;
