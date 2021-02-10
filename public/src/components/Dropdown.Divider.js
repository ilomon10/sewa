import { Box } from "@primer/components";

export const Divider = ({ children, ...rest }) => {
  return (
    <Box
      role="none"
      sx={{
        borderTopColor: "gray.2",
        borderTopWidth: 1,
        borderTopStyle: "solid",
      }}
      {...rest}
    />
  )
}