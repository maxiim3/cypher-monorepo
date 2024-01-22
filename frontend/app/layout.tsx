import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "./globals.css"
import Link from "next/link"

const inter = Inter({subsets: ["latin"]})
type Route = {
	path: string
	name: string
}
const ROUTES: Route[] = [
	{path: "/", name: "Home"},
	{path: "/about", name: "About"},
]

export const metadata: Metadata = {
	title: "Cypher Service",
	description: "Multiservice encryption",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<header
					className={
						"p-8 w-full mx-auto flex flex-row justify-between items-center border-b border-lime-500/50"
					}>
					<h1 className={"text-balance"}>Micro service | Cepherizer</h1>
					<ul className={"text-balance px-8 flex flex-row gap-4"}>
						{ROUTES.map((route: Route) => {
							return (
								<li key={route.name}>
									<Link
										href={route.path}
										prefetch={false}>
										{route.name}
									</Link>
								</li>
							)
						})}
					</ul>
				</header>
				{children}
				{/* <footer className={"border-t p-8  border-lime-500/50"}> */}
				{/* 	<p>This could be a nice footer</p> */}
				{/* </footer> */}
			</body>
		</html>
	)
}
