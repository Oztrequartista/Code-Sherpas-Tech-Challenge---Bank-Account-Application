"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";


export default function PrelineScript({ containerRef }) {
	const path = usePathname();

	useEffect(() => {
		import("preline/preline");
	}, []);
	useEffect(() => {
		const observer = new MutationObserver((mutationsList, observer) => {
			for (let mutation of mutationsList) {
				if (mutation.type === 'childList') {
					let interval = setInterval(() => {
						if (typeof window !== "undefined" && window.HSStaticMethods) {
							window.HSStaticMethods.autoInit();
							clearInterval(interval);
						}
					}, 700);

					return () => {
						clearInterval(interval);
					}
				}
			}
		});

		if (containerRef.current) {
			observer.observe(containerRef.current, {
				childList: true,
				subtree: true
			});
		}

		return () => {
			observer.disconnect();
		};
	}, []);

	return null;
}