import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "https://pokeapi.co/api/v2";
const LIMIT = 151; // Limit to the first 150 Pokémon

export async function GET(request: NextRequest) {
	try {
		const response = await fetch(
			`${API_BASE_URL}/pokemon?offset=0&limit=${LIMIT}`
		);
		if (!response.ok) {
			console.error("Failed to fetch Pokémon data:", response.statusText);
			throw new Error("Failed to fetch Pokémon data");
		}
		const data = await response.json();

		console.log("Fetched first 151 Pokémon:", data.results.length);
		return NextResponse.json(data.results);
	} catch (error) {
		// Assert the type of error to Error
		if (error instanceof Error) {
			console.error("Error in API route:", error.message);
			return NextResponse.json({ error: error.message }, { status: 500 });
		} else {
			console.error("Unexpected error in API route:", error);
			return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
		}
	}
}
