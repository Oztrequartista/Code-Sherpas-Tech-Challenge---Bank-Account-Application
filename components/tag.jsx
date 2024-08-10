

const Tag = ({ children, className = '', ...rest }) => {

	return (
		<span
			className={`font-medium text-[0.75rem] text-center rounded-[4px] px-[0.86rem] py-[5px] shadow-none ${className}`}
			{...rest}
		>
			{children}
		</span>
	);
};


export default Tag;

