import { Link as GoTo } from "react-router-dom";

import { BorderBox, Box, Flex, Heading, Text, Link, ButtonOutline } from "@primer/components"
import { ShareAndroidIcon } from "@primer/styled-octicons"

const Item = () => {
  return (
    <BorderBox overflow="hidden">
      <Flex
        sx={{
          borderBottomWidth: 1,
          borderBottomColor: "gray.3",
          borderBottomStyle: "solid"
        }}
      >
        <Box height={75} width={75} flexShrink={0} backgroundColor="gray.2">
          <img style={{ display: "block" }} alt={"Alt text"} src="https://via.placeholder.com/75" />
        </Box>
        <Box p={2}>
          <Link as={GoTo} to={"/ilomon10/desain-banner-cepat"} muted>
            <Heading as="h3" fontSize={1}>Kita bole desain banner cepat nda perlu lama</Heading>
          </Link>
        </Box>
      </Flex>
      <Flex alignItems="center" py={2}>
        <Box px={2}>
          <Text fontSize={1}>Harga <Text fontWeight="bold">Rp.25.000</Text></Text>
        </Box>
        <Box flexGrow={1} />
        <Box px={2}>
          <ButtonOutline variant="small" title="Simpan dlu">
            <ShareAndroidIcon />
          </ButtonOutline>
        </Box>
      </Flex>
    </BorderBox>
  )
}

export default Item;