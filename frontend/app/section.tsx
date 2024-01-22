import {ComponentPropsWithoutRef} from "react"

export function Section({children}: ComponentPropsWithoutRef<"section">) {
	return (
		<section className={"min-w-[240px] w-full max-w-[860px] bg-lime-950/30 p-8 rounded-sm"}>
			{children}
		</section>
	)
}
