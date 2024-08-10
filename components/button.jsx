import Link from "next/link";

const Button = ({
  children,
  loading,
  disabled,
  variant = "primary",
  className = "gap-2",
  href = "",
  ...rest
}) => {
  // console.log("className", className);
  let additionalClassNames = className;

  switch (variant) {
    case "primary":
      additionalClassNames += " bg-primary-600 text-white";
      break;

    case "danger":
      additionalClassNames += " bg-red-500 text-white";
      break;

    case "warning":
      additionalClassNames += " bg-yellow-500 text-white";
      break;

    case "success":
      additionalClassNames += " bg-green-500 text-white";
      break;

    case "secondary":
      additionalClassNames += " bg-gray-500 text-white";
      break;

    case "outline-primary":
      additionalClassNames +=
        " bg-transparent border border-primary text-primary";
      break;

    case "outline-danger":
      additionalClassNames +=
        " bg-transparent border border-red-500 text-red-500";
      break;

    case "outline-warning":
      additionalClassNames +=
        " bg-transparent border border-yellow-500 text-yellow-500";
      break;

    case "outline-success":
      additionalClassNames +=
        " bg-transparent border border-green-500 text-green-500";
      break;

    case "outline-secondary":
      additionalClassNames +=
        " bg-transparent border border-gray-500 text-gray-500";
      break;

    // case 'primary':
    // 	additionalClassNames += " bg-primary text-white";
    // 	break;

    // case 'primary':
    // 	additionalClassNames += " bg-primary text-white";
    // 	break;

    default:
      break;
  }

  const Component = href
    ? Link
    : ({ children, ...props }) => <button {...props}>{children}</button>;

  return (
    <Component
      href={href}
      disabled={disabled ?? loading}
      className={`text-[14px] flex justify-center items-center px-3 py-[10px] shadow-none rounded-[4px] ${loading ? "cursor-not-allowed" : ""} ${additionalClassNames}`}
      {...rest}
    >
      {loading ? (
        <i className="ri-loader-line inline-block animate-spin font-[700] text-[14px] mr-1"></i>
      ) : null}
      {children}
    </Component>
  );
};

export default Button;
