import { useEffect, useState } from "react";
import { getPokemonList, getPokemonDetails } from "@/lib/pokeApi";

interface Pokemon {
	name: string;
	url: string;
}

interface PokemonDetails {
	name: string;
	sprites: {
		front_default: string;
	};
	stats: {
		stat: {
			name: string;
		};
		base_stat: number;
	}[];
}

const PokeStats = () => {
	const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
	const [selectedPokemon, setSelectedPokemon] = useState<string>("");
	const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
		null
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		setIsLoading(true);
		getPokemonList()
			.then((data) => {
				setPokemonList(data.results);
				console.log(data.results);
			})
			.catch((error) => {
				console.error("Failed to fetch Pokemon list:", error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	useEffect(() => {
		if (selectedPokemon) {
			setIsLoading(true);
			getPokemonDetails(selectedPokemon)
				.then((data) => {
					setPokemonDetails(data);
				})
				.catch((error) => {
					console.error("Failed to fetch Pokemon details:", error);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [selectedPokemon]);

	return (
		<div>
			<h1>Pokemon Stats</h1>
			<select
				value={selectedPokemon}
				onChange={(e) => setSelectedPokemon(e.target.value)}>
				<option value="">Select a Pokemon</option>
				{pokemonList.map((pokemon) => (
					<option key={pokemon.name} value={pokemon.name}>
						{pokemon.name}
					</option>
				))}
			</select>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				pokemonDetails && (
					<div>
						<h2>{pokemonDetails.name}</h2>
						<img
							src={pokemonDetails.sprites.front_default}
							alt={pokemonDetails.name}
						/>
						<ul>
							{pokemonDetails.stats.map((stat) => (
								<li key={stat.stat.name}>
									{stat.stat.name}: {stat.base_stat}
								</li>
							))}
						</ul>
					</div>
				)
			)}
		</div>
	);
};

export default PokeStats;
