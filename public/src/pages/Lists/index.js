import { useCallback, useContext, useEffect, useState } from "react";
import { Box, Flex, Text, Dropdown, Grid, Pagination } from "@primer/components";
import Item from "../../components/Item";
import { FeathersContext } from "../../components/feathers";

const Lists = ({ query, pagination = false, col = 3 }) => {
  const feathers = useContext(FeathersContext);
  const [list, setList] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}]);
  const [loading, setLoading] = useState(true);
  const [paging, setPaging] = useState({
    total: 0,
    limit: 0,
    skip: 0,
    pageCount: 0,
    currentPage: 0
  });
  const fetch = useCallback(async (paging) => {
    setLoading(true);
    try {
      let ids = await feathers.gigs.find({
        query: {
          $skip: paging.skip,
          $select: ["id"],
          ...query,
        }
      });
      ids = ids.data.map(gig => gig.id);
      const { data, total, limit, skip } = await feathers.gigs.find({
        query: {
          id: { $in: ids },
          $select: ["id", "slug", "basic_price", "title"],
          $include: [{
            model: "users",
            attributes: ["id", "username"]
          }, {
            model: "media",
            attributes: ["id", "path"],
            as: "media"
          }],
        }
      });

      await setList(data.map(gig => ({
        ...gig,
        url: `/${gig["user"]["username"]}/${gig["slug"]}`,
        media: gig.media.length > 0
          ? `${feathers.host}${gig.media[0].path}`
          : "",
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
  }, [query]);

  useEffect(() => {
    fetch(paging);
  }, [query]);

  return (
    <>
      <Grid mx={-2} gridTemplateColumns={`repeat(${col}, ${100 / col}%)`}>
        {list.map(({ id, title, basic_price, url, media }, idx) => (
          <Box key={id || idx} mb={3} px={2}>
            <Item
              loading={loading}
              title={title}
              price={basic_price}
              url={url}
              image={media}
            />
          </Box>
        ))}
      </Grid>
      {pagination && paging.total > 0 &&
        <Pagination
          pageCount={paging.pageCount}
          currentPage={paging.currentPage}
          onPageChange={(event, page) => {
            event.preventDefault();
            fetch({ skip: (1 - page) * paging.limit });
          }}

        />}
    </>
  )
}

export default Lists;