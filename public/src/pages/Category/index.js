import { Box, Flex, Heading, Text } from "@primer/components"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import _debounce from "lodash.debounce";

import Dropdown from "../../components/Dropdown"
import { FeathersContext } from "../../components/feathers"

import Lists from "../Lists"
import Filter from "./Filter"
import { formatMoney } from "../../components/helper";

const Category = () => {
  const params = useParams();
  const feathers = useContext(FeathersContext);
  const [category, setCategory] = useState({
    title: params.category
  });
  const [filter, setFilter] = useState({});
  const [loading, setLoading] = useState(false);
  const [totalGig, setTotalGig] = useState(0);

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

  const onFilterChange = _debounce((q) => {
    setFilter(q);
  }, 1000);

  return (
    <Box maxWidth={750} mx="auto" px={2}>
      <Box px={2}>
        <Heading mt={4} fontSize={3}>{params.category}</Heading>
        <Text as="p" my={2} fontSize={1} color="gray.5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Text>
        <Flex my={3}>
          <Filter
            onChange={onFilterChange}
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
        <Flex mb={3}>
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
        {category.id &&
          <Lists
            onChange={(_, { total }) => {
              setTotalGig(total);
            }}
            loading={loading}
            query={{
              categoryId: category.id,
              $limit: 12,
              ...filter
            }}
            pagination={true}
          />}
      </Box>
    </Box>
  )
}
export default Category;