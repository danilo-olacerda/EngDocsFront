import { Container, Title, Paper, TextInput, PasswordInput, Button, Text, Center, Box, Stack, Image } from '@mantine/core';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from '@mantine/core';
import { register } from "../../services/authService.jsx";
import EngDocsIcon from '../../assets/Eng.webp';

export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [companyCEP, setCompanyCEP] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function send(e) {

        e.preventDefault();

        setLoading(true);

        if (password !== confirmPassword) {
            alert("As senhas não conferem!");
            setLoading(false);
            return;
        }

        const body = {
            name,
            email,
            password,
            confirmPassword,
            companyName,
            companyAddress,
            companyCEP
        };

        try {

            await register(body);
            alert("Cadastro realizado com sucesso!");
            setLoading(false);
            navigate("/");

        } catch (error) {
            if (error.response.data === "Email already in use") {
                alert("Esse email já está cadastrado!");
                return;
            }

            alert("Erro ao cadastrar!");
        } finally {
            setLoading(false);
        }

    }

    return (
        <Box
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f8f9fa',
                padding: '16px',
            }}
        >
            <Container size={500} my={40}>
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
                        <Stack spacing="md">
                            <TextInput
                                label="Nome"
                                placeholder="Seu nome completo"
                                required
                                disabled={loading}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                size="md"
                            />
                            <TextInput
                                label="E-mail"
                                placeholder="seu@email.com"
                                type="email"
                                required
                                disabled={loading}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                size="md"
                            />
                            <PasswordInput
                                label="Senha"
                                placeholder="Mínimo 10 caracteres"
                                required
                                disabled={loading}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                size="md"
                                minLength={10}
                            />
                            <PasswordInput
                                label="Confirme a senha"
                                placeholder="Digite a senha novamente"
                                required
                                disabled={loading}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                size="md"
                                minLength={10}
                            />
                            <TextInput
                                label="Nome da empresa"
                                placeholder="Nome da sua empresa"
                                required
                                disabled={loading}
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                size="md"
                            />
                            <TextInput
                                label="Endereço da empresa"
                                placeholder="Endereço completo"
                                required
                                disabled={loading}
                                value={companyAddress}
                                onChange={(e) => setCompanyAddress(e.target.value)}
                                size="md"
                            />
                            <TextInput
                                label="CEP da empresa"
                                placeholder="Apenas números"
                                type="tel"
                                maxLength={9}
                                required
                                disabled={loading}
                                value={companyCEP}
                                onChange={(e) => setCompanyCEP(e.target.value)}
                                size="md"
                            />
                            <Button
                                fullWidth
                                type="submit"
                                disabled={loading}
                                size="md"
                                color="dark"
                                mt="md"
                                style={{ backgroundColor: '#000000' }}
                            >
                                {loading ? <Loader size="sm" color="white" /> : 'Cadastrar'}
                            </Button>
                        </Stack>
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
                        onClick={() => !loading && navigate("/")}
                    >
                        Empresa já cadastrada? Faça login!
                    </Text>
                </Center>
            </Container>
        </Box>
    )
};