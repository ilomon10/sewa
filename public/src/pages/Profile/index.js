import { Avatar, Box, Heading, Flex, Text, Link, Grid, Button } from "@primer/components"
import { PlusIcon } from "@primer/styled-octicons";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FeathersContext } from "../../components/feathers";
import Lists from "../Lists";
import CreateGigs from "./CreateGigs";


const Profile = () => {
  const params = useParams();
  const history = useHistory();
  const feathers = useContext(FeathersContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [user, setUser] = useState({
    name: "",
    location: "",
    profile: null,
  });
  useEffect(() => {
    const fetch = async () => {
      let user = {};
      try {
        user = await feathers.users.find({
          query: {
            username: params.profile,
            $select: ["id", "name", "username", "location", "profile", "createdAt", "telephone"]
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
              <Flex color="gray.5" fontSize={1} mb={2}>
                <Box flexGrow={1}>
                  <Text>Member Sejak</Text>
                </Box>
                <Text fontWeight="bold">Sep 2017</Text>
              </Flex>
              <Flex color="gray.5" fontSize={1} mb={2}>
                <Box flexGrow={1}>
                  <Text>Kontak</Text>
                </Box>
                <Link fontWeight="bold" href={`tel:${user.telephone}`} muted>{user.telephone}</Link>
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
                <CreateGigs
                  isOpen={isDialogOpen}
                  onDismiss={() => setIsDialogOpen(false)}
                  onAccept={({ slug }) => {
                    history.push(`/${params.profile}/${slug}`);
                  }}
                />
              </>}
          </Flex>
          <Box px={2} mb={4}>
            <Lists
              col={2}
              pagination
              query={{
                userId: user.id
              }}
            />
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default Profile;