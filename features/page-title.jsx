const PageTitle = ({ title, slotRight = null, className = '', titleClass = '', slotRightClassName = '' }) => {

	return (
		<div className={`flex lg:items-center gap-4 flex-col lg:flex-row ${className} `}>
			<h1 className={`text-body_lg1_normal text-neutral-900 ${titleClass}`}>{title}</h1>
			<div className={`lg:ml-auto ${slotRightClassName}`}>
				{slotRight}
			</div>
		</div>
	);
};


export default PageTitle;