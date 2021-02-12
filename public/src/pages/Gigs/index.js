import { useContext, useEffect } from "react";
import { Link as GoTo, useParams } from "react-router-dom";
import { Box, ButtonPrimary, Dropdown, Flex, Grid, Heading, Link, SubNav, Text } from "@primer/components";
import { StopwatchIcon } from "@primer/styled-octicons";
import AspectRatio from "../../components/AspectRatio";
import Item from "../../components/Item";
import { useState } from "react";
import { FeathersContext } from "../../components/feathers";
import Lists from "../Lists";

const Gigs = () => {
  const params = useParams();
  const feathers = useContext(FeathersContext);
  const [plan, setPlan] = useState("basic");
  const [user, setUser] = useState({
    username: params.profile
  });
  const [gig, setGig] = useState({
    slug: params.gig
  })
  useEffect(() => {
    const fetch = async () => {
      let user = {};
      try {
        user = await feathers.users.find({
          query: { username: params.profile }
        })
        if (user.data.length < 1) return;
        user = {
          ...user.data[0]
        }
        setUser(() => user)
      } catch (e) {
        console.error(e);
        return false;
      }

      let gig = {};

      try {
        gig = await feathers.gigs.find({
          query: { slug: params.gig }
        })
        console.log(gig);
        setGig(gig.data[0]);
      } catch (e) {
        console.error(e);
      }
    }
    fetch();
  }, [params]);
  return (
    <Box px={2} pt={4} maxWidth={750} mx="auto">
      <Flex mb={4}>
        <Box width="40%" flexShrink={0} px={2}>
          <Box>
            <AspectRatio ratio="1:1">
              <img width="100%" src="https://via.placeholder.com/250x250" />
            </AspectRatio>
          </Box>
          <Flex py={2} mx={-1}>
            <Box px={1} width={`${100 / 3}%`}>
              <AspectRatio ratio="1:1">
                <img width="100%" src="https://via.placeholder.com/125x125" />
              </AspectRatio>
            </Box>
            <Box px={1} width={`${100 / 3}%`}>
              <AspectRatio ratio="1:1">
                <img width="100%" src="https://via.placeholder.com/125x125" />
              </AspectRatio>
            </Box>
            <Box px={1} width={`${100 / 3}%`}>
              <AspectRatio ratio="1:1">
                <img width="100%" src="https://via.placeholder.com/125x125" />
              </AspectRatio>
            </Box>
          </Flex>
        </Box>
        <Box px={2}>
          <Heading fontSize={4} mb={2}>{gig.title}</Heading>
          <Text color="gray.5">
            <Link as={GoTo} to={`/${params.profile}`} fontWeight="bold">{params.profile}</Link>
            <Text> level 2 | Antri 3 orderan</Text>
          </Text>
          <Box my={4}>
            <SubNav aria-label="Main">
              <SubNav.Links>
                <SubNav.Link role="button" selected={plan === "basic"} onClick={() => setPlan("basic")}>Basic</SubNav.Link>
                <SubNav.Link role="button" selected={plan === "standard"} onClick={() => setPlan("standard")}>Standard</SubNav.Link>
                <SubNav.Link role="button" selected={plan === "premium"} onClick={() => setPlan("premium")}>Premium</SubNav.Link>
              </SubNav.Links>
            </SubNav>
            {plan === "basic" &&
              <>
                <Flex my={4} alignItems="center">
                  <Text fontSize={2}>Paket <Text fontWeight="bold">{gig["basic_title"]}</Text></Text>
                  <Box flexGrow={1}></Box>
                  <Text fontSize={3}>Rp. {gig["basic_price"]}</Text>
                </Flex>
                <Text as="p" color="gray.5">{gig["basic_description"]}</Text>
                <Flex alignItems="center" color="gray.7" my={4}>
                  <StopwatchIcon />
                  <Text fontWeight="bold" ml={2}>Waktu {gig["basic_worktime"]} hari kerja</Text>
                </Flex>
              </>
            }
            {plan === "standard" &&
              <>
                <Flex my={4} alignItems="center">
                  <Text fontSize={2}>Paket <Text fontWeight="bold">{gig["standard_title"]}</Text></Text>
                  <Box flexGrow={1}></Box>
                  <Text fontSize={3}>Rp. {gig["standard_price"]}</Text>
                </Flex>
                <Text as="p" color="gray.5">{gig["standard_description"]}</Text>
                <Flex alignItems="center" color="gray.7" my={4}>
                  <StopwatchIcon />
                  <Text fontWeight="bold" ml={2}>Waktu {gig["standard_worktime"]} hari kerja</Text>
                </Flex>
              </>
            }
            {plan === "premium" &&
              <>
                <Flex my={4} alignItems="center">
                  <Text fontSize={2}>Paket <Text fontWeight="bold">{gig["premium_title"]}</Text></Text>
                  <Box flexGrow={1}></Box>
                  <Text fontSize={3}>Rp. {gig["premium_price"]}</Text>
                </Flex>
                <Text as="p" color="gray.5">{gig["premium_description"]}</Text>
                <Flex alignItems="center" color="gray.7" my={4}>
                  <StopwatchIcon />
                  <Text fontWeight="bold" ml={2}>Waktu {gig["premium_worktime"]} hari kerja</Text>
                </Flex>
              </>
            }
            <ButtonPrimary width="100%" variant="large">Booking</ButtonPrimary>
          </Box>
        </Box>
      </Flex>
      <Flex px={2} mb={4} alignItems="center">
        <Heading fontSize={4}>Lainnya dari <Link as={GoTo} to={`/${params.profile}`}>{params.profile}</Link></Heading>
        <Box flexGrow={1} />
        <Text>
          <Text>Urutan </Text>
          <Dropdown>
            <summary>
              <Flex role="button" alignItems="center" sx={{ cursor: "pointer" }}>
                <Text fontWeight="bold">Relevan</Text>
                <Dropdown.Caret ml={2} />
              </Flex>
            </summary>
            <Dropdown.Menu>
              <Dropdown.Item>Relevan</Dropdown.Item>
              <Dropdown.Item>Terbaik</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Text>
      </Flex>
      <Lists query={{
        userId: user.id
      }} />
    </Box>
  )
}

export default Gigs;