"use client";

import { useEffect, useState } from "react";

interface Pokemon {
	name: string;
	url: string;
}

interface PokemonDetails {
	name: string;
	height: number;
	weight: number;
	sprites: {
		front_default: string;
	};
	stats: {
		base_stat: number;
		stat: {
			name: string;
		};
	}[];
}

const PokeStatsRoute = () => {
	const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
	const [selectedPokemon, setSelectedPokemon] = useState<string>("");
	const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
		null
	);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [isLoadingDetails, setIsLoadingDetails] = useState<boolean>(false);

	useEffect(() => {
		const fetchPokemonList = async () => {
			try {
				const response = await fetch("/api/pokemon");
				if (!response.ok) {
					throw new Error("Failed to fetch Pokémon list");
				}
				const data = await response.json();
				setPokemonList(data);
			} catch (err) {
				setError("Failed to fetch Pokémon list");
			} finally {
				setLoading(false);
			}
		};

		fetchPokemonList();
	}, []);

	useEffect(() => {
		const fetchPokemonDetails = async () => {
			if (selectedPokemon) {
				try {
					setIsLoadingDetails(true);
					const response = await fetch(`/api/pokemon/${selectedPokemon}`);
					if (!response.ok) {
						throw new Error(
							`Failed to fetch details for Pokémon: ${selectedPokemon}`
						);
					}
					const data = await response.json();
					setPokemonDetails(data);
				} catch (err) {
					setError(`Failed to fetch details for Pokémon: ${selectedPokemon}`);
				} finally {
					setIsLoadingDetails(false);
				}
			}
		};

		fetchPokemonDetails();
	}, [selectedPokemon]);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
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
			{isLoadingDetails ? (
				<div>Loading...</div>
			) : (
				pokemonDetails && (
					<div>
						<img
							src={pokemonDetails.sprites.front_default}
							alt={pokemonDetails.name}
						/>
						<p className="font-bold">{pokemonDetails.name} stats:</p>
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

export default PokeStatsRoute;
