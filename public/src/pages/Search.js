import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Dropdown, Flex, Heading, Pagination, Text } from "@primer/components";
import Item from "../components/Item";
import Lists from "./Lists";
import Filter from "./Category/Filter";
import { formatMoney } from "../components/helper";

const Search = () => {
  const location = useLocation();
  const [filter, setFilter] = useState({});
  const query = new URLSearchParams(location.search).get("query")
  return (
    <Box px={2} pt={4} maxWidth={750} mx="auto">
      <Box px={2} mb={4}>
        <Heading>Hasil pencarian "{query}"</Heading>
      </Box>
      <Flex my={3}>
        <Filter
          onChange={(q) => setFilter(q)}
          fields={[{
            key: "basic_price",
            title: "Harga",
            type: "range",
            options: {
              from: {
                key: "$gte",
                placeholder: "Mulai",
                type: "number",
                parse: (val) => {
                  return `Rp. ${formatMoney(val)}`;
                }
              },
              to: {
                key: "$lte",
                placeholder: "Sampai",
                type: "number",
                parse: (val) => {
                  return `Rp. ${formatMoney(val)}`;
                }
              }
            },
          }, {
            key: "basic_worktime",
            title: "Waktu Kerja",
            type: "select",
            options: [{
              name: "Cepat",
              value: -1,
            }, {
              name: "Lama",
              value: 1,
            }],
          }]}
        />
      </Flex>
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
      <Box>
        <Lists
          query={{
            $limit: 12,
            title: { $like: `%${query}%` },
            ...filter
          }}
          pagination={true}
        />
      </Box>
    </Box>
  )
}

export default Search;