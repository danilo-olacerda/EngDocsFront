import { Box, Container, Title } from '@mantine/core';
import Header from '../../components/Header.jsx';

export default function NewDailyPart() {
    return (
        <>
            <Header />
            <Box
                sx={(theme) => ({
                    marginTop: 80,
                    padding: theme.spacing.xl,
                    minHeight: 'calc(100vh - 80px)',
                    backgroundColor: '#fafafa',
                })}
            >
                <Container size="lg">
                    <Title order={2} mb="xl">Nova Parte Diária</Title>
                    {/* Add form fields here */}
                </Container>
            </Box>
        </>
    )
}