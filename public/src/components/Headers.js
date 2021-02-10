import { Link as GoTo, useHistory } from "react-router-dom";
import { Avatar, Box, Button, CounterLabel, Dropdown, Flex, Heading, Link, SelectMenu, Text, TextInput, Truncate } from "@primer/components"
import { BellIcon, SearchIcon } from "@primer/styled-octicons";
import { Divider as DropdownDivider } from "./Dropdown.Divider";

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
                if (e.key !== "Enter") return;
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
            <Link muted as={GoTo} to="/join" fontWeight="bold" >Jadi Penjual</Link>
            <Link muted as={GoTo} to="/login" ml={4}>Masuk</Link>
            <Link muted as={GoTo} to="/join" ml={4}>Gabung</Link>
          </Box>
          <Box px={2}>
            <SelectMenu>
              <Flex as="summary" alignItems="center">
                <BellIcon />
              </Flex>
              <SelectMenu.Modal align="right">
                <SelectMenu.Header>Notifikasi</SelectMenu.Header>
                <SelectMenu.List>
                  <SelectMenu.Item as="button">
                    <Flex width="100%">
                      <Text>Andra</Text>
                      <Box ml={2} flexGrow={1}><Truncate color="gray.4" title="Gmn mo jadi pesan ato nda?">Gmn mo jadi pesan ato nda?</Truncate></Box>
                      <CounterLabel>12</CounterLabel>
                    </Flex>
                  </SelectMenu.Item>
                  <SelectMenu.Item>Bijon</SelectMenu.Item>
                  <SelectMenu.Item>Bijon</SelectMenu.Item>
                  <SelectMenu.Item>Bijon</SelectMenu.Item>
                  <SelectMenu.Item>Bijon</SelectMenu.Item>
                </SelectMenu.List>
                <SelectMenu.Footer>Showing 3 of 3</SelectMenu.Footer>
              </SelectMenu.Modal>
            </SelectMenu>
          </Box>
          <Flex px={2} alignItems="center">
            <Dropdown>
              <Flex as="summary" alignItems="center">
                <Avatar size={20} src="https://avatars.githubusercontent.com/primer" />
                <Dropdown.Caret ml={1} />
              </Flex>
              <Dropdown.Menu
                sx={{
                  "&:before": {
                    pointerEvents: "none"
                  },
                  "&:after": {
                    pointerEvents: "none"
                  }
                }}
              >
                <Dropdown.Item as={GoTo} to="/ilomon10">Profile</Dropdown.Item>
                <DropdownDivider />
                <Dropdown.Item>Sign out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Flex>
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