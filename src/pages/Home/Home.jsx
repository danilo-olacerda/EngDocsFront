import Header from '../../components/Header.jsx';
import { Container, Title, Box } from '@mantine/core';

export default function Home() {

    return (
        <>
            <Header />
            <Box
                sx={(theme) => ({
                    marginTop: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 'calc(100vh - 80px)',
                    padding: theme.spacing.xl,
                    backgroundColor: theme.colors.gray[0],
                })}
            >
                <Container size="md">
                    <Title
                        align="center"
                        order={1}
                        sx={(theme) => ({
                            fontSize: 32,
                            fontWeight: 700,
                            color: theme.colors.dark[9],
                            lineHeight: 1.4,
                        })}
                    >
                        Bem vindo(a)! Selecione uma opção acima para navegar entre os registros.
                    </Title>
                </Container>
            </Box>
        </>
    )

}