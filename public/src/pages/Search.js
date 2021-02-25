import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Flex, Heading, Pagination, Text } from "@primer/components";
import Dropdown from "../components/Dropdown";
import Lists from "./Lists";
import Filter from "./Category/Filter";
import { formatMoney } from "../components/helper";

const Search = () => {
  const location = useLocation();
  const [filter, setFilter] = useState({});
  const [totalGig, setTotalGig] = useState(0);
  const query = new URLSearchParams(location.search).get("query")
  return (
    <Box px={2} pt={4} maxWidth={750} mx="auto">
      <Box px={2} mb={4}>
        <Heading>Hasil pencarian "{query}"</Heading>
      </Box>
      <Flex px={2} my={3}>
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
        <Text color="gray.5"><Text fontWeight="bold">{totalGig}</Text> layanan ditemukan</Text>
        <Box flexGrow={1} />
        <Text>
          <Text>Urutan </Text>
          <Dropdown defaultValue="Relevan">
            {({ value, setValue, setOpen }) => (
              <>
                <summary>
                  <Flex alignItems="center">
                    <Text fontWeight="bold">{value}</Text>
                    <Dropdown.Caret />
                  </Flex>
                </summary>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => {
                    setOpen(open => !open);
                    setValue("Relevan");
                  }}>Relevan</Dropdown.Item>
                  <Dropdown.Item onClick={() => {
                    setOpen(open => !open);
                    setValue("Terbaru");
                  }}>Terbaru</Dropdown.Item>
                </Dropdown.Menu>
              </>
            )}
          </Dropdown>
        </Text>
      </Flex>
      <Box px={2}>
        <Lists
          onChange={(_, { total }) => {
            setTotalGig(total);
          }}
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