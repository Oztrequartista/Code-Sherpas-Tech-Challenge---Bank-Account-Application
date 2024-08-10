import { useState } from "react";

const { getEntityInitials } = require("@/utils");

// WARNING: Don't use `imageOnlyProps.src`. Pass `src` as a prop directly

const EntityImage = ({
  src,
  entityName,
  imageOnlyProps,
  initialsSpanOnlyProps,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  return hasError || !src ? (
    <span {...rest} {...initialsSpanOnlyProps}>
      {getEntityInitials(entityName)}
    </span>
  ) : (
    <img
      src={src}
      onError={() => setHasError(true)}
      {...rest}
      {...imageOnlyProps}
    />
  );
};

export default EntityImage;
