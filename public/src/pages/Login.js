import { Link as GoTo } from "react-router-dom";
import { Box, ButtonPrimary, FormGroup, Heading, Link, Text, TextInput } from "@primer/components";

const Login = () => {
  return (
    <Box width={240} mx="auto" py={4}>
      <Heading>Masuk</Heading>
      <FormGroup>
        <FormGroup.Label htmlFor="login.email">Email / Username</FormGroup.Label>
        <TextInput
          id="login.email"
          name="email"
          variant="small"
        />
      </FormGroup>
      <FormGroup>
        <FormGroup.Label htmlFor="login.password">Password</FormGroup.Label>
        <TextInput
          id="login.password"
          name="password"
          type="password"
          variant="small"
        />
      </FormGroup>
      <Box mb={3}>
        <label><input type="checkbox" /> Tetap masuk</label>
      </Box>
      <ButtonPrimary display="block" mb={2}>Masuk</ButtonPrimary>
      <Link>Lupa password?</Link>
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