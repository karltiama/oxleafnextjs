export const getPokemonList = async () => {
	const response = await fetch("https://pokeapi.co/api/v2/pokemon");
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
};

export const getPokemonDetails = async (name: string) => {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
};
