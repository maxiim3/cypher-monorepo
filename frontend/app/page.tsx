import {CypherService} from "@/app/cypherService"

export default function Home() {
	return (
		<main className={"flex flex-col items-center py-12 gap-12"}>
			<CypherService />
		</main>
	)
}
