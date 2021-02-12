import { Avatar, Box, Heading, Flex, Text, Link, Grid, Button } from "@primer/components"
import { PlusIcon } from "@primer/styled-octicons";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FeathersContext } from "../../components/feathers";
import Item from "../../components/Item"
import CreateGigs from "./CreateGigs";


const Profile = () => {
  const params = useParams();
  const feathers = useContext(FeathersContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [user, setUser] = useState({
    name: "",
    location: "",
    profile: null,
  });
  const [gigs, setGigs] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      let user = {};
      try {
        user = await feathers.users.find({
          query: {
            username: params.profile,
            $select: ["id", "name", "username", "location", "profile", "createdAt"]
          }
        })
        if (user.data.length < 1) return;
        user = {
          ...user.data[0]
        }
        setUser(() => user)
      } catch (e) {
        console.error(e)
        return false;
      }

      console.log(user);
      let gigs = [];

      try {
        gigs = await feathers.gigs.find({
          query: {
            userId: user.id,
            $select: ["id", "slug", "title", "basic_price", "updatedAt"],
            $include: {
              model: "users",
              attributes: ["id", "username"]
            }
          }
        })
        gigs = gigs.data.map(gig => {
          const url = `/${gig["user"]["username"]}/${gig.slug}`;
          return { ...gig, url }
        })
        setGigs(gigs);
      } catch (e) {
        console.error(e);
      }
    }
    fetch();
  }, [params]);
  return (
    <Box
      pt={4}
      maxWidth={750}
      mx="auto"
    >
      <Flex px={2}>
        <Box width="35%" mb={4} mr={3}>
          <Box px={2} mb={4}>
            <Box mb={3}>
              <Avatar size={125} src="https://avatars.githubusercontent.com/primer" />
              <Heading mt={3} as="h3" fontSize={3}>{user.name}</Heading>
            </Box>
            <Box mb={3}>
              <Flex color="gray.5" fontSize={1} mb={2}>
                <Box flexGrow={1}>
                  <Text>Dari</Text>
                </Box>
                <Text fontWeight="bold" textAlign="right">{user.location}</Text>
              </Flex>
              <Flex color="gray.5" fontSize={1}>
                <Box flexGrow={1}>
                  <Text>Member Sejak</Text>
                </Box>
                <Text fontWeight="bold">Sep 2017</Text>
              </Flex>
            </Box>
          </Box>
          <Box px={2} my={4}>
            <Heading as="h3" fontSize={2}>Deskripsi</Heading>
            <Text as="p" fontSize={1} textAlign="justify">{user.profile}</Text>
          </Box>
          <Box px={2} my={4}>
            <Heading as="h3" fontSize={2}>Akun Sosial</Heading>
            <Box my={2}><Link muted>Google</Link></Box>
            <Box my={2}><Link muted>Facebook</Link></Box>
            <Box my={2}><Link muted>Instagram</Link></Box>
            <Box my={2}><Link muted>Twitter</Link></Box>
          </Box>
        </Box>
        <Box width="65%">
          <Flex alignItems="center" mb={4} px={2}>
            <Heading as="h3" fontSize={2} >Layanan {user.username}</Heading>
            <Box flexGrow={1}></Box>
            {(feathers.account && feathers.account.username === user.username) &&
              <>
                <Button variant="small" onClick={() => setIsDialogOpen(true)}>
                  <Flex alignItems="center">
                    <PlusIcon size={12} />
                    <Text ml={1}>Buat layanan baru</Text>
                  </Flex>
                </Button>
                <CreateGigs isOpen={isDialogOpen} onDismiss={() => setIsDialogOpen(false)} />
              </>}
          </Flex>
          <Grid gridTemplateColumns="repeat(2, auto)">
            {gigs.map(({ id, title, basic_price, url }) => (
              <Box key={id} mb={3} px={2}>
                <Item title={title} price={basic_price} url={url} />
              </Box>
            ))}
          </Grid>
        </Box>
      </Flex>
    </Box>
  )
}

export default Profile;