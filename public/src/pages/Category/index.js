import { Box, Dropdown, Flex, Heading, Text, Pagination } from "@primer/components"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FeathersContext } from "../../components/feathers"
import Lists from "../Lists"

const Category = () => {
  const params = useParams();
  const feathers = useContext(FeathersContext);
  const [category, setCategory] = useState({
    title: params.category
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(params.category);
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
        })
        console.log(category);
        if (category.data && category.data.length) {
          setCategory(category.data[0])
        }
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    fetch();
  }, [params.category])
  return (
    <Box maxWidth={750} mx="auto" px={2}>
      <Box px={2}>
        <Heading mt={4} fontSize={3}>{params.category}</Heading>
        <Text as="p" my={2} fontSize={1} color="gray.5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Text>
        <Flex my={3}>
          <Dropdown>
            <Dropdown.Button>Harga</Dropdown.Button>
            <Dropdown.Menu direction="se">
              <Dropdown.Item>Relevan</Dropdown.Item>
              <Dropdown.Item>Terbaik</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Button ml={2}>Waktu Kerja</Dropdown.Button>
            <Dropdown.Menu direction="se">
              <Dropdown.Item>Relevan</Dropdown.Item>
              <Dropdown.Item>Terbaik</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
        {category.id &&
          <Lists
            loading={loading}
            query={{
              categoryId: category.id,
              $limit: 9
            }}
            pagination={true}
          />}
      </Box>
    </Box>
  )
}
export default Category;