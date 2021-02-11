import { useCallback, useContext, useState } from "react";
import { Link as GoTo, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, ButtonPrimary, Flex, FormGroup, Heading, Link, Text, TextInput } from "@primer/components";
import { FeathersContext } from "../components/feathers";

const Login = () => {
  const history = useHistory();
  const feathers = useContext(FeathersContext);
  const { register, handleSubmit } = useForm();
  const login = (data) => {
    feathers.doAuthenticate({
      strategy: "local",
      email: data.email,
      password: data.password,
    }).then(() => {
      history.push("/");
      history.go(0);
    })
  };
  return (
    <Box width={275} mx="auto" py={4}>
      <Heading>Masuk</Heading>
      <form onSubmit={handleSubmit(login)}>
        <FormGroup>
          <FormGroup.Label htmlFor="login.email">Email / Username</FormGroup.Label>
          <TextInput
            ref={register}
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
            ref={register}
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
          <label><input name="stay-logged" type="checkbox" ref={register} /> Tetap masuk</label>
          <Box flexGrow={1}></Box>
          <Link>Lupa password?</Link>
        </Flex>
        <ButtonPrimary type="submit" display="block" mb={2} width="100%">Masuk</ButtonPrimary>
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
      </form>
    </Box>
  )
}

export default Login;