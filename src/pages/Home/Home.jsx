import Header from '../../components/Header.jsx';
import { Container, Title, Box } from '@mantine/core';

export default function Home() {

    return (
        <>
            <Header />
            <Box
                style={{
                    marginTop: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 'calc(100vh - 80px)',
                    padding: '32px',
                    backgroundColor: '#f8f9fa',
                }}
            >
                <Container size="md">
                    <Title
                        align="center"
                        order={1}
                        style={{
                            fontSize: 32,
                            fontWeight: 700,
                            color: '#212529',
                            lineHeight: 1.4,
                        }}
                    >
                        Bem vindo(a)! Selecione uma opção acima para navegar entre os registros.
                    </Title>
                </Container>
            </Box>
        </>
    )

}