import { Dropdown as PDropdown, Button, ButtonDanger, Details, useDetails } from "@primer/components";
import { useEffect, useRef, useState } from "react";
import { Divider } from "./Dropdown.Divider";

const Dropdown = ({ children, onChange = () => { }, defaultValue }) => {
  const { getDetailsProps, open, setOpen } = useDetails({
    closeOnOutsideClick: true
  });
  const [value, setValue] = useState(defaultValue);
  const { onToggle, ...detailsProps } = getDetailsProps();

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <Details
      {...detailsProps}
      open={open}
      onToggle={(e) => {
        onToggle(e);
      }}
      sx={{
        display: "inline-block",
        position: "relative"
      }}
    >
      {children({
        value, setValue,
        open, setOpen
      })}
    </Details>
  )
}

Dropdown.Caret = PDropdown.Caret;
Dropdown.Menu = PDropdown.Menu;
Dropdown.Item = PDropdown.Item;
Dropdown.Divider = Divider;

export default Dropdown;