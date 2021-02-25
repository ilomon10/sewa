import { useContext, useEffect, useMemo, useState } from "react";
import { Link as GoTo, NavLink as NavGoTo, useHistory, useLocation, useParams } from "react-router-dom";
import { Box, Breadcrumb, Button, ButtonPrimary, Dropdown, Flex, Heading, Link, SubNav, Text, Dialog } from "@primer/components";
import { StopwatchIcon, PencilIcon } from "@primer/styled-octicons";
import AspectRatio from "../../components/AspectRatio";
import { FeathersContext } from "../../components/feathers";
import { formatMoney } from "../../components/helper";
import Lists from "../Lists";
import EditGigs from "./EditGigs";

const Gigs = () => {
  const params = useParams();
  const history = useHistory();
  const location = useLocation();
  const feathers = useContext(FeathersContext);
  const plan = useMemo(() => {
    const search = new URLSearchParams(location.search);
    return search.get("plan") || "basic";
  }, [location.search]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [user, setUser] = useState({
    username: params.profile
  });
  const [gig, setGig] = useState({
    slug: params.gig,
    category: {},
    media: []
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
          query: {
            slug: params.gig,
            $include: [{
              model: "categories",
              attributes: ["id", "title"]
            }, {
              model: "media",
              attributes: ["id", "path"],
              as: "media",
              through: { attributes: [] }
            }]
          },
        })
        console.log(gig);
        setGig(gig.data[0]);
      } catch (e) {
        console.error(e);
      }
    }
    fetch();
  }, [params.gig]);
  return (
    <Box px={2} pt={4} maxWidth={750} mx="auto">
      <Flex mb={4}>
        <Box width="40%" flexShrink={0} px={2}>
          {gig.media.length > 0 && (<>
            <Box>
              <AspectRatio ratio="1:1">
                <Box
                  as="img"
                  width="100%"
                  height="100%"
                  src={`${feathers.host}${gig.media[0]["path"]}`}
                  sx={{ objectFit: "cover" }}
                />
              </AspectRatio>
            </Box>
            <Flex py={2} mx={-1}>
              {gig.media.map(({ id, path }) => (
                <Box key={id} px={1} width={`${100 / 3}%`}>
                  <AspectRatio ratio="1:1">
                    <Box
                      as="img"
                      width="100%"
                      height="100%"
                      src={`${feathers.host}${path}`}
                      sx={{
                        objectFit: "cover"
                      }}
                    />
                  </AspectRatio>
                </Box>
              ))}
            </Flex>
          </>)}
        </Box>
        <Box px={2}>
          <Flex alignItems="center">
            <Box>
              <Breadcrumb>
                <Breadcrumb.Item as={NavGoTo} exact to={`/`}>Sewa</Breadcrumb.Item>
                <Breadcrumb.Item as={NavGoTo} to={`/${gig.category.title}`}>{gig.category.title}</Breadcrumb.Item>
              </Breadcrumb>
            </Box>
            <Box flexGrow={1} />
            <Box>
              {(feathers.account && feathers.account.username === user.username) &&
                <>
                  <Button variant="small" onClick={() => setIsDialogOpen(true)}>
                    <Flex alignItems="center">
                      <PencilIcon size={12} />
                      <Text ml={1}>Edit</Text>
                    </Flex>
                  </Button>
                  <Dialog isOpen={isDialogOpen} onDismiss={() => setIsDialogOpen(false)}>
                    <EditGigs data={gig} onAccept={() => history.go()} onDismiss={() => setIsDialogOpen(false)} />
                  </Dialog>
                </>}
            </Box>
          </Flex>
          <Heading fontSize={4} mb={2}>{gig.title}</Heading>
          <Text color="gray.5">
            <Link as={GoTo} to={`/${params.profile}`} fontWeight="bold">{params.profile}</Link>
            <Text> level 2 | </Text>
            <Link as={GoTo} to={`/category/${gig.category.title}`}>{gig.category.title}</Link>
          </Text>
          <Box my={4}>
            <SubNav aria-label="Main">
              <SubNav.Links>
                <SubNav.Link
                  onClick={() => { history.push(`/${params.profile}/${params.gig}?plan=basic`); }}
                  role="button"
                  selected={plan === "basic"}
                >Basic</SubNav.Link>
                <SubNav.Link
                  onClick={() => { history.push(`/${params.profile}/${params.gig}?plan=standard`); }}
                  role="button"
                  selected={plan === "standard"}
                >Standard</SubNav.Link>
                <SubNav.Link
                  onClick={() => { history.push(`/${params.profile}/${params.gig}?plan=premium`); }}
                  role="button"
                  selected={plan === "premium"}
                >Premium</SubNav.Link>
              </SubNav.Links>
            </SubNav>
            {plan === "basic" &&
              <>
                <Flex my={4} alignItems="center">
                  <Text fontSize={2}>Paket <Text fontWeight="bold">{gig["basic_title"]}</Text></Text>
                  <Box flexGrow={1}></Box>
                  <Text fontSize={3}>Rp. {formatMoney(gig["basic_price"])}</Text>
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
                  <Text fontSize={3}>Rp. {formatMoney(gig["standard_price"])}</Text>
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
                  <Text fontSize={3}>Rp. {formatMoney(gig["premium_price"])}</Text>
                </Flex>
                <Text as="p" color="gray.5">{gig["premium_description"]}</Text>
                <Flex alignItems="center" color="gray.7" my={4}>
                  <StopwatchIcon />
                  <Text fontWeight="bold" ml={2}>Waktu {gig["premium_worktime"]} hari kerja</Text>
                </Flex>
              </>
            }
            <ButtonPrimary
              as="a"
              display="block"
              variant="large"
              href={`tel:${user.telephone}`}
            >Booking</ButtonPrimary>
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
      <Box px={2} mb={4}>
        <Lists query={{
          userId: user.id,
          $limit: 6
        }} />
      </Box>
      <Heading mb={4} fontSize={3}>Kategori <Link as={GoTo} to={`/${gig.category.title}`}>{gig.category.title}</Link></Heading>
      <Box px={2} mb={4}>
        {!!gig.category.id &&
          <Lists query={{
            categoryId: gig.category.id,
            $limit: 3
          }} />}
      </Box>
    </Box>
  )
}

export default Gigs;