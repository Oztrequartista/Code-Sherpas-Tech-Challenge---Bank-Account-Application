export default function Radio({ ...props }) {
  return (
    <input
      type="radio"
      name={props.id}
      className="shrink-0 mt-0.5 border-gray-200 cursor-pointer rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
      id={props.name ?? props.id}
      {...props}
    />
  );
}
