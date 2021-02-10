import { Link as GoTo } from "react-router-dom";
import { Box, ButtonPrimary, Dropdown, Flex, Grid, Heading, Link, SubNav, Text } from "@primer/components";
import { StopwatchIcon } from "@primer/styled-octicons";
import AspectRatio from "../../components/AspectRatio";
import Item from "../../components/Item";

const Gigs = () => {
  return (
    <Box px={2} pt={4} maxWidth={750} mx="auto">
      <Flex mb={4}>
        <Box width="40%" flexShrink={0} px={2}>
          <Box>
            <AspectRatio ratio="1:1">
              <img width="100%" src="https://via.placeholder.com/250x250" />
            </AspectRatio>
          </Box>
          <Flex py={2} mx={-1}>
            <Box px={1} width={`${100 / 3}%`}>
              <AspectRatio ratio="1:1">
                <img width="100%" src="https://via.placeholder.com/125x125" />
              </AspectRatio>
            </Box>
            <Box px={1} width={`${100 / 3}%`}>
              <AspectRatio ratio="1:1">
                <img width="100%" src="https://via.placeholder.com/125x125" />
              </AspectRatio>
            </Box>
            <Box px={1} width={`${100 / 3}%`}>
              <AspectRatio ratio="1:1">
                <img width="100%" src="https://via.placeholder.com/125x125" />
              </AspectRatio>
            </Box>
          </Flex>
        </Box>
        <Box px={2}>
          <Heading fontSize={4} mb={2}>Kita bole desain banner cepat nda perlu lama</Heading>
          <Text color="gray.5">
            <Link as={GoTo} to="/ilomon10" fontWeight="bold">ilomon10</Link>
            <Text> level 2 | Antri 3 orderan</Text>
          </Text>
          <Box my={4}>
            <SubNav aria-label="Main">
              <SubNav.Links>
                <SubNav.Link selected>Basic</SubNav.Link>
                <SubNav.Link >Standard</SubNav.Link>
                <SubNav.Link >Premium</SubNav.Link>
              </SubNav.Links>
            </SubNav>
            <Flex my={4} alignItems="center">
              <Text fontSize={2}>Paket <Text fontWeight="bold">Biasa</Text></Text>
              <Box flexGrow={1}></Box>
              <Text fontSize={3}>Rp. 20.000</Text>
            </Flex>
            <Text as="p" color="gray.5">✓Page creation ✓Buttons ✓Settings ✓Basic details ✓Profile and cover image applied</Text>
            <Flex alignItems="center" color="gray.7" my={4}>
              <StopwatchIcon />
              <Text fontWeight="bold" ml={2}>Waktu 2 hari kerja</Text>
            </Flex>
            <ButtonPrimary width="100%" variant="large">Booking (Rp. 20.000)</ButtonPrimary>
          </Box>
        </Box>
      </Flex>
      <Flex px={2} mb={3}>
        <Heading mb={4} fontSize={4}>Lainnya dari <Link as={GoTo} to="/ilomon10">ilomon10</Link></Heading>
        <Box flexGrow={1} />
        <Text>
          <Text>Urutan </Text>
          <Dropdown>
            <summary>
              <Flex role="button" alignItems="center" sx={{ cursor: "pointer" }}>
                <Text fontWeight="bold">Relevan</Text>
                <Dropdown.Caret ml={2} />
              </Flex>
            </summary>
            <Dropdown.Menu>
              <Dropdown.Item>Relevan</Dropdown.Item>
              <Dropdown.Item>Terbaik</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Text>
      </Flex>
      <Grid mb={4} gridTemplateColumns="repeat(3, auto)">
        {[1, 2, 3, 4, 5].map((v) => (
          <Box key={v} mb={3} px={2}>
            <Item />
          </Box>
        ))
        }
      </Grid>
    </Box>
  )
}

export default Gigs;