import { Dropdown as PDropdown } from "@primer/components";
import { useEffect, useRef, useState } from "react";

const Dropdown = ({ children, open, onToggle, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PDropdown
      {...props}
      overlay={true}
      open={isOpen}
      onToggle={(e) => {
        if (typeof onToggle === "function") onToggle(e);
        setIsOpen(!isOpen);
      }}
    >
      {children}
    </PDropdown>
  )
}

export default Dropdown;