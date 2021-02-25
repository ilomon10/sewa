import { Box, Flex, Link, Text } from "@primer/components";
import { OctofaceIcon } from "@primer/styled-octicons";

const Footer = () => {
  return (
    <Box
      sx={{
        borderTopWidth: 1,
        borderTopColor: "gray.3",
        borderTopStyle: "solid"
      }}
    >
      <Flex
        py={4}
        px={2}
        maxWidth={750}
        mx="auto"
      >
        <Box px={2}>
          <Text color="gray.4">{"\u00a9"} 2021 TagConn, inc. - <Link muted href="https://www.fiverr.com/">Fiverr</Link> kw super</Text>
          <Link ml={4}>Terms</Link>
          <Link ml={4}>Privacy</Link>
          <Link ml={4}>Security</Link>
        </Box>
        <Box flexGrow={1} />
        <Box px={2}>
          <Link ml={4} muted href="https://github.com/ilomon10/sewa"><OctofaceIcon /></Link>
        </Box>
      </Flex>
    </Box>
  )
}

export default Footer;