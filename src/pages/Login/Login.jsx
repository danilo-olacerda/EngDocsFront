import { Container, Image, Paper, TextInput, PasswordInput, Button, Text, Center, Box } from '@mantine/core';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from '@mantine/core';
import UserContext from "../../contexts/UserContext.jsx";
import { login } from "../../services/authService.jsx";
import EngDocsIcon from '../../assets/Eng.png';

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
      style={{
        display: 'flex',
        minHeight: '100vh',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: '16px',
      }}
    >
      <Container size={420} my={40}>
        <Image src={EngDocsIcon} alt="EngDocs" height={100} />

        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          style={{ backgroundColor: '#ffffff' }}
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
              style={{ backgroundColor: '#000000' }}
            >
              {loading ? <Loader size="sm" color="white" /> : 'Entrar'}
            </Button>
          </form>
        </Paper>

        <Center mt="xl">
          <Text
            size="sm"
            weight={600}
            style={{
              cursor: loading ? 'not-allowed' : 'pointer',
              color: '#495057',
            }}
            onClick={() => !loading && navigate("/register")}
          >
            Criar nova empresa
          </Text>
        </Center>
      </Container>
    </Box>
  )
};