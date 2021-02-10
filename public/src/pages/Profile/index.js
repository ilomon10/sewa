import { Avatar, Box, Heading, Flex, Text, Link, Grid } from "@primer/components"
import Item from "../../components/Item"


const Profile = () => {
  return (
    <Box
      pt={4}
      maxWidth={750}
      mx="auto"
    >
      <Flex>
        <Box width="35%" mb={4} mr={3}>
          <Box px={2} mb={4}>
            <Box mb={3}>
              <Avatar size={125} src="https://avatars.githubusercontent.com/primer" />
              <Heading mt={3} as="h3" fontSize={3}>Imanuel Pundoko</Heading>
            </Box>
            <Box mb={3}>
              <Flex color="gray.5" fontSize={1} mb={2}>
                <Box flexGrow={1}>
                  <Text>Dari</Text>
                </Box>
                <Text fontWeight="bold" textAlign="right">Minahasa</Text>
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
            <Heading as="h3" fontSize={3}>Deskripsi</Heading>
            <Text as="p" fontSize={1} textAlign="justify">My name Is Ani and I am professional social media manager and content creator with 5 years+ of experience. I work along with a young and energetic team of experts giving end to end social media management and graphic design. We can develop effective social media strategies to drive brand engagement and awareness in the long run for your business. The platforms included are Facebook, Instagram, Twitter, Pinterest and LinkedIn. I am open to work on any gig plus new offers. Let’s make it happen!</Text>
          </Box>
          <Box px={2} my={4}>
            <Heading as="h3" fontSize={3}>Akun Sosial</Heading>
            <Box my={2}><Link muted>Google</Link></Box>
            <Box my={2}><Link muted>Facebook</Link></Box>
            <Box my={2}><Link muted>Instagram</Link></Box>
            <Box my={2}><Link muted>Twitter</Link></Box>
          </Box>
        </Box>
        <Box width="65%">
          <Grid gridTemplateColumns="repeat(2, auto)">
            {[1, 2, 3, 4, 5].map((v) => (
              <Box key={v} mb={3} px={2}>
                <Item />
              </Box>
            ))}
          </Grid>
        </Box>
      </Flex>
    </Box>
  )
}

export default Profile;