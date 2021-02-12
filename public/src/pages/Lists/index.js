import { useContext, useEffect, useState } from "react";
import { Box, Grid } from "@primer/components";
import Item from "../../components/Item";
import { FeathersContext } from "../../components/feathers";

const Lists = ({ query }) => {
  const feathers = useContext(FeathersContext);
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const gigs = await feathers.gigs.find({
          query: {
            $select: ["id", "slug", "basic_price", "title"],
            $include: {
              model: "users",
              attributes: ["id", "username"]
            }
          }
        });
        console.log(gigs);
        setList(gigs.data.map(gig => ({
          ...gig,
          url: `/${gig["user"]["username"]}/${gig["slug"]}`
        })));
      } catch (e) {
        console.error(e);
      }
    }
    fetch();
  }, [query]);
  return (
    <Grid mx={-2} gridTemplateColumns="repeat(3, auto)">
      {list.map(({ id, title, basic_price, url }) => (
        <Box key={id} mb={3} px={2}>
          <Item title={title} price={basic_price} url={url} />
        </Box>
      ))}
    </Grid>
  )
}

export default Lists;