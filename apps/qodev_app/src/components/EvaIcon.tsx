import * as eva from "eva-icons";
import React, { useEffect } from "react";

interface Props {
  id?: string;
  name: string;
  fill?: string;
  width?: number;
  height?: number;
  className?: string;
  ariaHidden?: boolean;
}

export const EvaIcon: React.FC<Props> = ({
  id,
  name,
  fill,
  width,
  height,
  className,
  ariaHidden = false,
}) => {
  useEffect(() => {
    eva.replace();
  }, []);

  const sanitizedName = name.replace(/[^a-zA-Z0-9-]/g, "");

  return (
    <i
      id={id}
      data-eva={sanitizedName}
      data-eva-fill={fill}
      data-eva-height={height}
      data-eva-width={width}
      className={className}
      aria-hidden={ariaHidden}
    />
  );
};
