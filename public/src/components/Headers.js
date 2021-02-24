import { Link as GoTo, useHistory } from "react-router-dom";
import { Avatar, Box, CounterLabel, Flex, Heading, Link, SelectMenu, Text, TextInput, Truncate } from "@primer/components"
import { BellIcon, SearchIcon } from "@primer/styled-octicons";
import Dropdown from "./Dropdown";
import { useContext, useEffect, useState } from "react";
import { FeathersContext } from "./feathers";

const Header = () => {
  const history = useHistory();
  const feathers = useContext(FeathersContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      try {
        await feathers.doReAuthenticate();
        setLoading(false);
      } catch (e) {
        setLoading(false);
        return;
      }
    }
    fetch();
  }, []);
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
          {loading && <Box>Loading</Box>}
          {!(feathers.account !== null) &&
            <Box px={2}>
              <Link muted as={GoTo} to="/join" fontWeight="bold" >Jadi Penjual</Link>
              <Link muted as={GoTo} to="/login" ml={4}>Masuk</Link>
              <Link muted as={GoTo} to="/join" ml={4}>Gabung</Link>
            </Box>
          }
          {(feathers.account !== null) &&
            <>
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
                  {({ setOpen }) => (
                    <>
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
                        <Dropdown.Item
                          as={GoTo}
                          to="/ilomon10"
                          onClick={() => setOpen(open => !open)}
                        >Profile</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          onClick={() => {
                            feathers.doLogout();
                            history.go(0);
                          }}
                        >Sign out</Dropdown.Item>
                      </Dropdown.Menu>
                    </>
                  )}
                </Dropdown>
              </Flex>
            </>}
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