import Link from "next/link";
import * as React from "react";

export interface IAppProps {}

export default function Footer(props: IAppProps) {
	return (
		<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
			<p className="text-xs text-zinc-500 dark:text-zinc-400">
				© BID BITS. All rights reserved.
			</p>
			<nav className="sm:ml-auto flex gap-4 sm:gap-6">
				<Link className="text-xs hover:underline underline-offset-4" href="#">
					About Us
				</Link>
				<Link className="text-xs hover:underline underline-offset-4" href="#">
					Contact
				</Link>
				<Link className="text-xs hover:underline underline-offset-4" href="#">
					Privacy Policy
				</Link>
				<Link className="text-xs hover:underline underline-offset-4" href="#">
					Terms of Service
				</Link>
			</nav>
		</footer>
	);
}
