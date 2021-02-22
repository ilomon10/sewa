import { BorderBox, Box, ButtonOutline, Flex, Heading, Link, Text } from "@primer/components";
import AspectRatio from "../components/AspectRatio";
import Slider from "react-slick";
import Lists from "./Lists";

import recommendImage1 from "../assets/recommendation_1.png";
import recommendImage2 from "../assets/recommendation_2.png";
import recommendImage3 from "../assets/recommendation_3.png";

const Carousel = ({ image, title, subtitle }) => {
  return (
    <div>
      <a className="recommendation-carousel" style={{
        position: "relative",
        "--image-url": `url(${image})`
      }}>
        <Box sx={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          py: 4,
          px: 3,
          color: "white",
          textShadow: "0px 1px black"
        }}>
          <Text m={0} mb={1} as="h2">{title}</Text>
          <Text m={0} as="p">{subtitle}</Text>
        </Box>
      </a>
    </div>
  )
}

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
                    margin: 0,
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
                  backgroundImage: "linear-gradient(90deg,rgba(34,35,37,.8),rgba(34,35,37,.25)),var(--image-url)",
                }
              }}
            >
              <Slider {...settings}>
                <Carousel
                  title={"Daftarkan jasa Anda sekarang"}
                  subtitle={"Hadirkan layanan anda secara online."}
                  image={recommendImage2}
                />
                <Carousel
                  title={"Booking mobil langsung disini"}
                  subtitle={"Cari rental mobil yang sesuai."}
                  image={recommendImage3}
                />
                <Carousel
                  title={"Pekerja profesional"}
                  subtitle={"Sewa pekerja lepas yang memiliki dasar yang cukup."}
                  image={recommendImage1}
                />
              </Slider>
            </Box>
          </Box>
        </Box>
      </Flex>
      <Box px={2} my={4}>
        <Heading mb={4} fontSize={4}>Terpopuler di <Link>Transportasi</Link></Heading>
        <Lists query={{
          categoryId: 1,
          $limit: 9
        }} />
      </Box>
      <Box px={2} my={4}>
        <Heading mb={4} fontSize={4}>Pilihan editor</Heading>
        <Lists query={{
          userId: 1,
          $limit: 12
        }} />
      </Box>
    </Box>
  )
}

export default Landing;