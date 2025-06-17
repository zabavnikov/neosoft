export async function useQuery<T>(input: string) {
	const data = await fetch(input)
	return await data.json() as T
}