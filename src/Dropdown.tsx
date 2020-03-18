import React, { FC, HTMLAttributes, ReactNode, useState } from "react";

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  overlay: ReactNode;
  className: string;
  onToggle: (isOpened: boolean) => void;
}

export const Dropdown: FC<DropdownProps> = ({
  children,
  overlay,
  className,
  onToggle,
  ...restProps
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    const toggledState = !isOpened;

    onToggle(toggledState);
    setIsOpened(toggledState);
  };

  return (
    <div className={className} {...restProps}>
      <div onClick={handleClick}>{children}</div>
      {isOpened && overlay}
    </div>
  );
};
