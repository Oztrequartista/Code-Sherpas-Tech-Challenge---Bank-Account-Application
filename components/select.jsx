import { useState } from "react";

const Select = ({
	className = '',
	selectClassName = '',
	children,
	value: valueProp,
	defaultValue,
	onChange,
	slotLeft = null,
	slotRight,
	slotRightClassName = 'border-l border-l-gray-400',
	slotLeftClassName = '',
	label = null,
	...rest }) => {

	const [value, setValue] = useState(valueProp ?? defaultValue);


	const DefaultSlotRight = () => (
		<div className="flex items-center justify-center w-full h-full">
			<i className="ri-arrow-down-s-line"></i>
		</div>
	);

	return (
		<div className={`${className} relative`}>
			{label ? (
				<label className="text-[0.84rem] text-gray-800 font-[300] block mb-1">
					{label}
				</label>
			) : null}
			<div className={`${className} bg-white text-[0.84rem] flex items-center h-[40px] rounded-[4px] border overflow-hidden`}>
				{slotLeft ? (
					<div className={`${slotLeftClassName} relative flex items-center h-full px-3`}>
						{slotLeft}
					</div>
				) : null}

				{/* internal select: should be kept private, invisible, and not to be exposed for styling by other components */}
				<select
					defaultValue={defaultValue}
					value={valueProp ?? value}
					onChange={(e) => {
						setValue(e.target.value);
						if (onChange) {
							onChange(e);
						}
					}}
					className="absolute top-0 left-0 w-full h-full opacity-0 z-[5] cursor-pointer"
				>
					{children}
				</select>

				{/* displayed select, is visible and can be styled */}
				<select
					{...rest}
					defaultValue={defaultValue}
					value={valueProp ?? value}
					className={`${selectClassName} cursor-pointer flex-1 bg-transparent font-medium text-[0.85rem] relative ${!slotLeft ? 'pl-3' : ''} pr-3 border-none outline-none z-[2] appearance-none`}
				>
					{children}
				</select>
				{typeof slotRight == 'undefined' ? (
					<div className={`${slotRightClassName} relative flex items-center h-full px-3`}>
						{slotRight ?? <DefaultSlotRight />}
					</div>
				) : null}
			</div>
		</div>
	);
}


export default Select;