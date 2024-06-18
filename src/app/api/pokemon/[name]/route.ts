import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "https://pokeapi.co/api/v2";

export async function GET(
	request: NextRequest,
	{ params }: { params: { name: string } }
) {
	const { name } = params;
	try {
		const response = await fetch(`${API_BASE_URL}/pokemon/${name}`);
		if (!response.ok) {
			console.error(
				`Failed to fetch details for Pokémon: ${name}`,
				response.statusText
			);
			throw new Error(`Failed to fetch details for Pokémon: ${name}`);
		}
		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in API route:", error.message);
			return NextResponse.json({ error: error.message }, { status: 500 });
		} else {
			console.error("Unexpected error in API route:", error);
			return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
		}
	}
}
