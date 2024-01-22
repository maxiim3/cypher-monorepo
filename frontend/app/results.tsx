import {Section} from "@/app/section"
import { memo } from "react"

 async function Results(props: {result: any}) {
	return (
		<Section>
			<p>{props.result}</p>
		</Section>
	)
}

// Export with memo : Cache the component when result is not updated in
// cypherService
// Prevent from rerendering Results component when cypherService is update
// (from its local state)
export default  memo(Results, (prev, next) => ( prev.result === next.result ))
