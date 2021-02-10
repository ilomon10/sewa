import { Link as GoTo } from "react-router-dom";
import { Box, ButtonPrimary, FormGroup, Heading, Link, Text, TextInput } from "@primer/components";

const Join = () => {
  return (
    <Box width={240} mx="auto" py={4}>
      <Heading>Gabung</Heading>
      <FormGroup>
        <FormGroup.Label htmlFor="login.email">Email</FormGroup.Label>
        <TextInput id="login.email" name="email" variant="small" />
      </FormGroup>
      <ButtonPrimary>Gabung</ButtonPrimary>
      <Box
        mt={3}
        pt={3}
        sx={{
          borderTopColor: "gray.3",
          borderTopWidth: 1,
          borderTopStyle: "solid"
        }}
      >
        <Text>Sudah punya akun? <Link as={GoTo} to="/login">Masuk</Link></Text>
      </Box>
    </Box>
  )
}

export default Join;