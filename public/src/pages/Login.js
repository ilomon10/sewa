import { Link as GoTo } from "react-router-dom";
import { Box, ButtonPrimary, Flex, FormGroup, Heading, Link, Text, TextInput } from "@primer/components";

const Login = () => {
  return (
    <Box width={275} mx="auto" py={4}>
      <Heading>Masuk</Heading>
      <FormGroup>
        <FormGroup.Label htmlFor="login.email">Email / Username</FormGroup.Label>
        <TextInput
          aria-label="email"
          id="login.email"
          name="email"
          variant="small"
          sx={{
            display: "flex"
          }}
        />
      </FormGroup>
      <FormGroup>
        <FormGroup.Label htmlFor="login.password">Password</FormGroup.Label>
        <TextInput
          aria-label="password"
          id="login.password"
          name="password"
          type="password"
          variant="small"
          sx={{
            display: "flex"
          }}
        />
      </FormGroup>
      <Flex mb={3}>
        <label><input type="checkbox" /> Tetap masuk</label>
        <Box flexGrow={1}></Box>
        <Link>Lupa password?</Link>
      </Flex>
      <ButtonPrimary display="block" mb={2} width="100%">Masuk</ButtonPrimary>
      <Box
        mt={3}
        pt={3}
        sx={{
          borderTopColor: "gray.3",
          borderTopWidth: 1,
          borderTopStyle: "solid"
        }}
      >
        <Text>Belum punya akun? <Link as={GoTo} to="/join">Daftar</Link></Text>
      </Box>
    </Box>
  )
}

export default Login;