"use client";

import { useEffect, useState } from "react";
import { getPokemonList, getPokemonDetails } from "@/lib/pokeApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

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
				console.log("Pokemon list:", data.results);
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
					console.log("Pokemon details:", data);
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
		<div className="flex items-center justify-center min-h-screen">
			<Card className="w-[350px] p-8">
				<CardHeader>
					<CardTitle>Pokemon Stats</CardTitle>
				</CardHeader>
				<CardContent>
					<Select onValueChange={(value: string) => setSelectedPokemon(value)}>
						<SelectTrigger>
							<SelectValue placeholder="Select Pokemon" />
							<SelectContent>
								{pokemonList.map((pokemon) => (
									<SelectItem key={pokemon.name} value={pokemon.name}>
										{pokemon.name}
									</SelectItem>
								))}
							</SelectContent>
						</SelectTrigger>
					</Select>
					{isLoading ? (
						<div>Loading...</div>
					) : (
						pokemonDetails && (
							<div className="flex flex-col">
								<Separator className="my-4" />
								<CardTitle>{pokemonDetails.name}</CardTitle>
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
				</CardContent>
			</Card>

			{/* <h1>Pokemon Stats</h1>
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
			)} */}
		</div>
	);
};

export default PokeStats;
