"use client";

import { useEffect, useState } from "react";
import { getPokemonList, getPokemonDetails } from "@/lib/pokeApi";

interface Pokemon {
	name: string;
	url: string;
}

const PokeStats = () => {
	const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
	const [selectedPokemon, setSelectedPokemon] = useState<string>("");
	const [pokemonDetails, setPokemonDetails] = useState<any | null>(null);

	useEffect(() => {
		getPokemonList().then((data) => {
			setPokemonList(data.results);
			console.log(data.results);
		});
	}, []);

	useEffect(() => {
		if (selectedPokemon) {
			getPokemonDetails(selectedPokemon).then((data) => {
				setPokemonDetails(data);
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
			{pokemonDetails && (
				<div>
					<h2>{pokemonDetails.name}</h2>
					<img
						src={pokemonDetails.sprites.front_default}
						alt={pokemonDetails.name}
					/>
					<ul>
						{pokemonDetails.stats.map((stat: any) => (
							<li key={stat.stat.name}>
								{stat.stat.name}: {stat.base_stat}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default PokeStats;
