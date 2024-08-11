import React from "react";

export default function Card({ title, value, icon, containerClass="" }) {
	return (
		<div className={`w-full p-[18px] flex flex-col gap-3 bg-white border border-neutral-100  h-full rounded-sm ${containerClass}`}>
		<div className="flex justify-between">
		  <p className="  lg:text-body_base_normal text-neutral-600">{title}</p>
		  <div>
			<i className={`${icon} text-neutral-200 text-body_lg1_normal`}></i>
		  </div>
		</div>
		<div className="text-[1.25rem] text-neutral-900">{value}</div>
	  </div>
	);
}
