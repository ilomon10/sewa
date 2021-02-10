import { Box, Dropdown, Flex, Grid, Heading, Pagination, Text } from "@primer/components";
import { useLocation } from "react-router-dom";
import Item from "../components/Item";

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query")
  return (
    <Box px={2} pt={4} maxWidth={750} mx="auto">
      <Box px={2} mb={4}>
        <Heading>Hasil pencarian "{query}"</Heading>
      </Box>
      <Flex px={2} mb={3}>
        <Text><Text fontWeight="bold">{22.354}</Text> ditemukan</Text>
        <Box flexGrow={1} />
        <Text>
          <Text>Urutan </Text>
          <Dropdown>
            <summary>
              <Flex alignItems="center">
                <Text fontWeight="bold">Relevan</Text>
                <Dropdown.Caret />
              </Flex>
            </summary>
            <Dropdown.Menu>
              <Dropdown.Item>Relevan</Dropdown.Item>
              <Dropdown.Item>Terbaik</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Text>
      </Flex>
      <Grid gridTemplateColumns="repeat(3, auto)">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11 ,12, 13, 14, 15, 16, 17, 18].map((v) => (
          <Box key={v} mb={3} px={2}>
            <Item />
          </Box>
        ))
        }
      </Grid>
      <Pagination
        pageCount={25}
        currentPage={3}
      />
    </Box>
  )
}

export default Search;