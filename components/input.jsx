import { useEffect, useRef, useState, forwardRef } from "react";

const NativeInput = forwardRef((props, ref) => <input {...props} ref={ref} />);
const NativeTextArea = forwardRef((props, ref) => (
  <textarea {...props} ref={ref} />
));

const Input = forwardRef(
  (
    {
      wrapperStyles = "",
      className = "",
      inputClassName = "",
      slotLeft = null,
      slotRight = null,
      slotRightClassName = "",
      slotLeftClassName = "",
      placeholder = null,
      label = null,
      labelStyles = "text-neutral-900",
      placeholderStyles = "",
      Component = NativeInput,
      value,
      errors = [],
      hasPlaceholderType2 = false,
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef(null);
    const [inputBoundingClientRect, setInputBoundingClientRect] =
      useState(null);

    useEffect(() => {
      if (inputRef.current) {
        setInputBoundingClientRect(inputRef.current.getBoundingClientRect());
      }
    }, [inputRef.current]);

    const showplaceholder = !value && placeholder;

    return (
      <div className={` w-full h-full ${className}`}>
        {label ? (
          <label className={`text-body_sm2_normal  block mb-2 ${labelStyles}`}>
            {label}
          </label>
        ) : null}
        <div
          className={`bg-white text-[14px] flex rounded-[4px] border border-neutral-100 ${hasPlaceholderType2 ? "" : "overflow-hidden"} px-4 ${wrapperStyles} w-full`}
        >
          {slotLeft || placeholder ? (
            <div className={`relative py-2 ${slotLeftClassName} `}>
              {slotLeft ? <span className="pr-2">{slotLeft}</span> : null}
              {(showplaceholder || (!showplaceholder && hasPlaceholderType2)) ? (
                <span
                  className={`text-[14px] absolute ${showplaceholder ? "top-0" : "top-[-20px] left-[calc(100%-9px)]"} left-[100%] transition-[top] ${Component == NativeInput ? "h-full" : "py-2"} flex items-center text-neutral-400 ${placeholderStyles}`}
                  style={{
                    width: inputBoundingClientRect?.width + "px",
                  }}
                >
                  <span className={`${showplaceholder ? "" : "bg-white relative z-[3] px-2 text-[12px]"}`}>
                    {placeholder}
                  </span>
                </span>
              ) : null}
            </div>
          ) : null}

          <Component
            {...rest}
            ref={ref ? ref : inputRef}
            placeholder=""
            value={value}
            className={`w-full py-2 flex-1 !bg-transparent autofill:bg-none [&:not(:placeholder-shown)]:bg-white text-neutral-900 text-[14px] relative border-none outline-none z-[2] ${inputClassName}`}
          />

          {slotRight ? (
            <div
              className={`relative h-full items-center flex justify-center py-2 px-0 ${slotRightClassName}`}
            >
              <span className="pl-2">{slotRight}</span>
            </div>
          ) : null}
        </div>
        {!!errors?.length && (
          <div className="mt-[6px]">
            {errors.map(e => (
              <p key={e} className="text-[13px] text-red-600">{e}</p>
            ))}
          </div>
        )}
      </div>
    );
  },
);

Input.TextArea = forwardRef((props, ref) => (
  <Input {...props} ref={ref} Component={NativeTextArea} />
));

export default Input;
