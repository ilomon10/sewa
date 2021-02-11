import { Link as GoTo } from "react-router-dom";

import { BorderBox, Box, Flex, Heading, Text, Link, ButtonOutline } from "@primer/components"
import { ShareAndroidIcon } from "@primer/styled-octicons"

const Item = ({ title, price, url }) => {
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
          <Link as={GoTo} to={url} muted>
            <Heading
              as="h3"
              fontSize={1}
              sx={{
                display: "-webkit-box",
                "-webkit-line-clamp": "3",
                "-webkit-box-orient": "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >{title}</Heading>
          </Link>
        </Box>
      </Flex>
      <Flex alignItems="center" py={2}>
        <Box px={2}>
          <Text fontSize={1}>Harga <Text fontWeight="bold">Rp.{price}</Text></Text>
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