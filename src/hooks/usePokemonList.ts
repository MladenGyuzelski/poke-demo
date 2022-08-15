import { useEffect, useState } from 'react';

type Pokemon = {
  name: string;
  url: string;
}

const usePokemonList = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=2000"
      );
      const data = await response.json();
      setPokemonList(data.results);
      setLoading(false);
    };
    // Get back to the 90s
    setTimeout(() => {
      fetchData();
    }, 500);
  }, []);

  return { pokemonList, loading };
};

export default usePokemonList;