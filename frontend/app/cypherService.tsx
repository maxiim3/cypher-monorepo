"use client"

import {Section} from "@/app/section"
import {lazy, Suspense, useEffect, useState} from "react"

// TYPE Available services from the backend
export type Techno = "Go" | "Rust" | "Node" | "Python" | "PHP"

// list of all service
export const listOfTechnos: Techno[] = ["Go", "Rust", "Node", "Python", "PHP"]

// Record of URL than are running from backend
const URLs: Record<Techno, string> = {
	Go: "",
	PHP: "http://localhost:4444",
	Rust: "",
	Python: "",
	Node: "http://localhost:5555",
}

// Routes from the backend should return the same routes
const API_ROUTES = {
	index: "/",
	cypher: "/cypher",
}

// utility function to delay the httpRequest and display the fallback message
function sleep(time: number, callback: () => void) {
	return new Promise(resolve => setTimeout(resolve, time)).then(callback)
}

// Initial data.
// Has to match the Post.body.json that all backend are receiving
const data = {message: "", secret: ""}

// Build the url based on the selected service / techno
function setUrl(selected: Techno) {
	switch (selected) {
		case "Go":
			return String(URLs.Go + API_ROUTES.cypher)
		case "Rust":
			return String(URLs.Rust + API_ROUTES.cypher)
		case "Node":
			return String(URLs.Node + API_ROUTES.cypher)
		case "Python":
			return String(URLs.Python + API_ROUTES.cypher)
		case "PHP":
			return String(URLs.PHP + API_ROUTES.cypher)
	}
}

// Import the component with lazy in order to fallback on Suspense
const Results = lazy(() => import("./results"))

export function CypherService() {
	// the selected Service/Techno
	const [currentTech, setCurrentTech] = useState<Techno>(listOfTechnos?.at(-1)!)
	// display the result component
	const [showResult, setShowResult] = useState(false)
	// set the result data from backend
	const [result, setResult] = useState<string | null>(null)
	// local input from user
	const [userData, setuserData] = useState<typeof data | null>(null)

	// fire the backend service
	function onRunCypher() {
		// Trivial handeling local input are not filled by user
		if (!userData) throw Error("Fill the data first")

		// turn on the Suspense component with result
		setShowResult(true)

		// delay the httpRequest
		sleep(600, () => {
			// used to approx time the service performance (1)
			console.time(`start service ${currentTech}`)
			// get the built url
			let url = setUrl(currentTech)
			try {
				fetch(url, {
					method: "POST",
					body: JSON.stringify({
						message: userData.message,
						secret: userData.secret,
					}),
				})
					.then(resp => {
						let json = resp.json()
						return json
					})
					.then(data => {
						// print the response from backend
						console.log(data)
						// {response : ...} matched the response from server
						setResult(data.response)
					})
			} catch (err) {
				console.log(err)
			}
			// Stop the timer (1)
			console.timeEnd(`start service ${currentTech}`)
		})
	}

	// reset the fileds and local states
	function onReset() {
		const inputs: HTMLInputElement[] = [...document.querySelectorAll("input")]!
		inputs.forEach((inp: HTMLInputElement) => (inp.value = ""))
        setuserData(null)
		setResult(null)
		setShowResult(false)
	}
	return (
		<>
			<Section>
				<h2>Available Technologies</h2>
				<p>Select the technology you wanna use to encrypt your data</p>
				<fieldset className={"flex flex-row gap-4 items-center"}>
					{listOfTechnos.map((tech: Techno) => {
						return (
							<div
								className={"space-x-1"}
								key={tech}>
								<label htmlFor={tech}>{tech}</label>
								<input
									className={"accent-lime-500"}
									onChange={() => setCurrentTech(tech)}
									tabIndex={0}
									type="radio"
									name={tech}
									id={tech}
									checked={tech === currentTech}
								/>
							</div>
						)
					})}
				</fieldset>
			</Section>

			<Section>
				<h2 className={"my-2"}>
					Techno : <span className={"text-lime-500 font-bold"}>{currentTech}</span>
				</h2>
				<fieldset className={"flex flex-col gap-4"}>
					<div className={"flex flex-col gap-1"}>
						<label
							className={"text-sm font-mono"}
							htmlFor="message">
							Message to encrypt
						</label>
						<input
							className={
								"p-2 border border-lime-800 rounded-sm px-2 py-1 text-white bg-transparent"
							}
							type="text"
							name="message"
							id="message"
							onChange={e =>
								setuserData(prev => ({
									secret: prev?.secret || "",
									message: e.target?.value,
								}))
							}
						/>
					</div>
					<div className={"flex flex-col gap-1"}>
						<label
							className={"text-sm font-mono"}
							htmlFor="secret">
							Secret Key
						</label>
						<input
							className={
								"p-2 border border-lime-800 rounded-sm px-2 py-1 text-white bg-transparent"
							}
							type="password"
							name="secret"
							id="secret"
							onChange={e =>
								setuserData(prev => ({
									message: prev?.message || "",
									secret: e.target?.value,
								}))
							}
						/>
					</div>
					<div className="flex flex-row gap-8">
						<button
							onClick={onRunCypher}
							className={
								"font-mono text-lime-500 border border-lime-600 rounded-md px-3 py-1 opacity-50 hover:opacity-100 transition-all ease duration-120"
							}>
							Run Cypher
						</button>
						{showResult && (
							<button
								onClick={onReset}
								className={
									"font-mono text-orange-500 border border-orange-600 rounded-md px-3 py-1 opacity-50 hover:opacity-100 transition-all ease duration-120"
								}>
								Reset
							</button>
						)}
					</div>
				</fieldset>
			</Section>

			{showResult && (
				<Suspense
					fallback={
						<Section>
							<p>Fetching...</p>
						</Section>
					}>
					<Results result={result} />
				</Suspense>
			)}
		</>
	)
}
