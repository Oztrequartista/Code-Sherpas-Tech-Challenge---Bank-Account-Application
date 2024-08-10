// add content to be shared by each layout

import PrelineScript from "@/lib/preline-script";
import { useRef } from "react";
import { Toaster } from 'react-hot-toast';

const SharedLayout = ({ children }) => {

	const ref = useRef();

	return (
		<div ref={ref}>
			<PrelineScript containerRef={ref} />
			<Toaster
				toastOptions={{
					duration: 5e3,
					position: 'top-right'
				}}
			/>
			{children}
		</div>
	);
};



export default SharedLayout;

