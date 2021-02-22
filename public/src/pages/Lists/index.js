import { useContext, useEffect, useState } from "react";
import { Box, Flex, Text, Dropdown, Grid, Pagination } from "@primer/components";
import Item from "../../components/Item";
import { FeathersContext } from "../../components/feathers";

const Lists = ({ query, pagination = false }) => {
  const feathers = useContext(FeathersContext);
  const [list, setList] = useState([{},{},{},{},{},{},{},{},{}]);
  const [loading, setLoading] = useState(true);
  const [paging, setPaging] = useState({
    total: 0,
    limit: 0,
    skip: 0,
    pageCount: 0,
    currentPage: 0
  });
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const { data, total, limit, skip } = await feathers.gigs.find({
          query: {
            $select: ["id", "slug", "basic_price", "title"],
            $include: {
              model: "users",
              attributes: ["id", "username"]
            }
          }
        });

        await setList(data.map(gig => ({
          ...gig,
          url: `/${gig["user"]["username"]}/${gig["slug"]}`
        })));

        await setPaging({
          total: total,
          limit: limit,
          skip: skip,
          currentPage: Math.floor(skip / limit) + 1 || 0,
          pageCount: Math.floor(total / limit) + 1 || 0
        });
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    fetch();
  }, [query]);
  return (
    <>
      <Grid mx={-2} gridTemplateColumns="repeat(3, auto)">
        {list.map(({ id, title, basic_price, url }) => (
          <Box key={id} mb={3} px={2}>
            <Item loading={loading} title={title} price={basic_price} url={url} />
          </Box>
        ))}
      </Grid>
      {pagination && paging.total > 0 &&
        <Pagination
          pageCount={paging.pageCount}
          currentPage={paging.currentPage}
        />}
    </>
  )
}

export default Lists;