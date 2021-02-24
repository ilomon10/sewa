import { Link as GoTo } from "react-router-dom";

import { BorderBox, Box, Flex, Heading, Text, Link, ButtonOutline } from "@primer/components"
import { ShareAndroidIcon } from "@primer/styled-octicons"
import { formatMoney } from "./helper";

const Item = ({
  title = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  price = 10000,
  url,
  image,
  loading = false
}) => {
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
          {!loading &&
            <img
              height="100%"
              width="100%"
              style={{
                display: "block", objectFit: "cover", overflow: "hidden"
              }}
              alt={`${title}`}
              src={image || "https://via.placeholder.com/75?text=no-image"}
            />
          }
        </Box>
        <Flex px={2} alignItems="center">
          <Link as={GoTo} to={url || "#"} muted>
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
            >
              <span className={loading ? "placeholder-content" : ""} style={{ lineHeight: loading ? "20px" : "inherit" }}>{title}</span>
            </Heading>
          </Link>
        </Flex>
      </Flex>
      <Flex alignItems="center" py={2}>
        <Box px={2}>
          <Text fontSize={1} className={loading ? "placeholder-content" : ""}>Harga <Text fontWeight="bold">Rp.{formatMoney(price)}</Text></Text>
        </Box>
        <Box flexGrow={1} />
        <Box px={2}>
          <ButtonOutline variant="small" title="Simpan dlu" className={loading ? "placeholder-content" : ""}>
            <ShareAndroidIcon />
          </ButtonOutline>
        </Box>
      </Flex>
    </BorderBox>
  )
}

export default Item;