import { Link as GoTo, useHistory } from "react-router-dom";
import { Box, Flex, Heading, Link, TextInput } from "@primer/components"
import { SearchIcon } from "@primer/styled-octicons";

const Header = () => {
  const history = useHistory();
  return (
    <Box>
      <Box
        sx={{
          borderBottomWidth: 1,
          borderBottomColor: "gray.1",
          borderBottomStyle: "solid"
        }}
      >
        <Flex
          p={2}
          alignItems="center"
          maxWidth={750}
          mx="auto"
        >
          <Box px={2}>
            <Link as={GoTo} muted to={"/"}>
              <Heading
                fontSize={3}
                color='primary'
              >SEWA</Heading>
            </Link>
          </Box>
          <Box px={2}>
            <TextInput
              id="search-box"
              name="search-box"
              placeholder="Cari"
              variant="small"
              onKeyDown={(e) => {
                if(e.key !== "Enter") return;
                history.push({
                  pathname: "/search/gigs",
                  search: `query=${e.target.value}&source=top_bar`
                })
              }}
              icon={SearchIcon}
            />
          </Box>
          <Box flexGrow={1} />
          <Box px={2}>
            <Link as={GoTo} to="/join" fontWeight="bold" >Jadi Penjual</Link>
            <Link as={GoTo} to="/login" ml={4}>Masuk</Link>
            <Link as={GoTo} to="/join" ml={4}>Gabung</Link>
          </Box>
        </Flex>
      </Box>
      <Box
        sx={{
          borderBottomWidth: 1,
          borderBottomColor: "gray.3",
          borderBottomStyle: "solid"
        }}
      >
        <Flex
          p={2}
          maxWidth={750}
          mx="auto"
        >
          <Link as={GoTo} ml={2} muted to="/category/freelance">Pekerja</Link>
          <Link as={GoTo} ml={4} muted to="/category/service">Reparasi</Link>
          <Link as={GoTo} ml={4} muted to="/category/transportation">Transportasi</Link>
          <Link as={GoTo} ml={4} muted to="/category/property">Properti</Link>
          <Link as={GoTo} ml={4} muted to="/category/design">Desain</Link>
          <Link as={GoTo} ml={4} muted to="/category/programming">Programming</Link>
          <Link as={GoTo} ml={4} muted to="/category/technology">Teknologi</Link>
        </Flex>
      </Box>
    </Box>
  )
}

export default Header;