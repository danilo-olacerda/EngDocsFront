import { Container, Title, Paper, TextInput, PasswordInput, Button, Text, Center, Box } from '@mantine/core';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from '@mantine/core';
import UserContext from "../../contexts/UserContext.jsx";
import { login } from "../../services/authService.jsx";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(UserContext);

  async function send(e) {
    e.preventDefault();
    setLoading(true);
    const body = {
      email,
      password
    };

    try {
      const newToken = await login(body);

      setToken(newToken.token);
      localStorage.setItem("token", JSON.stringify(newToken.token));
      navigate("/home");

    } catch (error) {
      alert("Email ou senha incorretos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: theme.colors.gray[0],
        padding: theme.spacing.md,
      })}
    >
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontWeight: 900,
            fontSize: 42,
            marginBottom: theme.spacing.xl,
            color: theme.black,
          })}
        >
          EngDocs
        </Title>

        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          sx={(theme) => ({
            backgroundColor: theme.white,
          })}
        >
          <form onSubmit={send}>
            <TextInput
              label="E-mail"
              placeholder="seu@email.com"
              required
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="md"
              mb="md"
            />
            <PasswordInput
              label="Senha"
              placeholder="Sua senha"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="md"
              mb="xl"
            />
            <Button
              fullWidth
              type="submit"
              disabled={loading}
              size="md"
              color="dark"
              sx={(theme) => ({
                backgroundColor: theme.black,
                '&:hover': {
                  backgroundColor: theme.colors.dark[9],
                },
              })}
            >
              {loading ? <Loader size="sm" color="white" /> : 'Entrar'}
            </Button>
          </form>
        </Paper>

        <Center mt="xl">
          <Text
            size="sm"
            weight={600}
            sx={(theme) => ({
              cursor: loading ? 'not-allowed' : 'pointer',
              color: theme.colors.dark[6],
              '&:hover': loading ? {} : {
                color: theme.black,
                textDecoration: 'underline',
              },
            })}
            onClick={() => !loading && navigate("/register")}
          >
            Criar nova empresa
          </Text>
        </Center>
      </Container>
    </Box>
  )
};