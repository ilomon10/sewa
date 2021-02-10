import { BorderBox, Box, ButtonOutline, Flex, Grid, Heading, Link, Text } from "@primer/components";
import AspectRatio from "../components/AspectRatio";
import Slider from "react-slick";
import Item from "../components/Item";

const Landing = () => {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Box maxWidth={750} mx="auto" px={2}>
      <Flex py={4}>
        <Box width={175} flexShrink={0} px={2}>
          <BorderBox p={3}>
            <AspectRatio ratio="1:1">
              <Flex height="100%" flexDirection="column" justifyContent="center">
                <Heading as="h3" mb={2} fontSize={2}>Hi Imanuel,</Heading>
                <Text mb={2} fontSize={1}>Cari penawaran dari penjual untuk kebutuhan Anda.</Text>
                <Box>
                  <ButtonOutline variant="small">Kirim Permintaan</ButtonOutline>
                </Box>
              </Flex>
            </AspectRatio>
          </BorderBox>
        </Box>
        <Box flexGrow={1} px={2}>
          <Box
            height="100%"
            sx={{
              overflow: "hidden",
              position: "relative",
              borderRadius: 2
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                ".slick-dots": {
                  width: "auto",
                  right: "initial",
                  left: 3,
                  bottom: 3,
                  "li": {
                    "button:before": {
                      color: "white",
                      fontSize: "10px"
                    },
                  },
                },
                ".recommendation-carousel": {
                  display: "block",
                  height: 175,
                  backgroundSize: "cover",
                  backgroundPosition: "100% 100%",
                  backgroundImage: "linear-gradient(90deg,rgba(34,35,37,.8),rgba(34,35,37,0)),var(--image-url)",
                }
              }}
            >
              <Slider {...settings}>
                <div>
                  <a className="recommendation-carousel" style={{
                    "--image-url": "url(https://via.placeholder.com/750x230)"
                  }}></a>
                </div>
                <div>
                  <a className="recommendation-carousel" style={{
                    "--image-url": "url(https://via.placeholder.com/750x230)"
                  }}></a>
                </div>
              </Slider>
            </Box>
          </Box>
        </Box>
      </Flex>
      <Box px={2} my={4}>
        <Heading mb={4} fontSize={4}>Terpopuler di <Link>Transportasi</Link></Heading>
        <Grid mx={-2} gridTemplateColumns="repeat(3, auto)">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => (
            <Box key={v} mb={3} px={2}>
              <Item />
            </Box>
          ))}
        </Grid>
      </Box>
      <Box px={2} my={4}>
        <Heading mb={4} fontSize={4}>Pilihan editor</Heading>
        <Grid mx={-2} gridTemplateColumns="repeat(3, auto)">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((v) => (
            <Box key={v} mb={3} px={2}>
              <Item />
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default Landing;