import { Box, Flex, Heading, Text } from "@primer/components"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Dropdown from "../../components/Dropdown"
import { FeathersContext } from "../../components/feathers"

import Lists from "../Lists"
import Filter from "./Filter"

const Category = () => {
  const params = useParams();
  const feathers = useContext(FeathersContext);
  const [category, setCategory] = useState({
    title: params.category
  });
  const [filter, setFilter] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setCategory({
      title: params.category
    });
    const fetch = async () => {
      try {
        const category = await feathers.categories.find({
          query: {
            title: params.category,
            $select: ["id", "title"]
          }
        });
        if (category.data && category.data.length) {
          setCategory(category.data[0])
        }
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    fetch();
  }, [params.category]);

  return (
    <Box maxWidth={750} mx="auto" px={2}>
      <Box px={2}>
        <Heading mt={4} fontSize={3}>{params.category}</Heading>
        <Text as="p" my={2} fontSize={1} color="gray.5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Text>
        <Flex my={3}>
          <Filter
            onChange={(q) => setFilter(q)}
            fields={{
              "basic_price": {
                name: "Harga",
                options: [{
                  name: "Ter-Mahal",
                  value: -1,
                }, {
                  name: "Ter-Murah",
                  value: 1,
                }]
              },
              "basic_worktime": {
                name: "Waktu Kerja",
                options: [{
                  name: "Cepat",
                  value: -1,
                }, {
                  name: "Lama",
                  value: 1,
                }]
              }
            }}
          />
        </Flex>
        <Flex px={2} mb={3}>
          <Text color="gray.5"><Text fontWeight="bold">{22.354}</Text> layanan ditemukan</Text>
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
        {category.id &&
          <Lists
            loading={loading}
            query={{
              categoryId: category.id,
              $limit: 12,
              $sort: { ...filter }
            }}
            pagination={true}
          />}
      </Box>
    </Box>
  )
}
export default Category;