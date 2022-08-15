import { useEffect, useMemo, useState } from "react";
import TagList from "./TagList";

type Props = {
  url: string;
  name: string;
}

type PokemonType = {
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
      url: string;
    }
  } [];
  weight: number;
}

const Pokemon = (props: Props) => {
  const { url, name } = props;

  const [pokemon, setPokemon] = useState<PokemonType | null>(null);

  const { types, sprites, weight } = pokemon || {};
  const { front_default: coverImage } = sprites || {};

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(url);
      setPokemon(await data.json() as PokemonType);
    }
    fetchData();
  }, [url]);

  const tags = useMemo(() => types?.map(({ type: { name } }) => name), [types]);

  return (
    <div className="card card-side w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={coverImage} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          <div className="capitalize">{name}</div>
          <div className="badge badge-accent">{weight} lb</div>
        </h2>
        <div className="card-actions justify-end">
          <TagList tags={tags} />
        </div>
      </div>
    </div>
  );
};

export default Pokemon;