import { Box, Group, Text, ActionIcon } from '@mantine/core';
import { IoExit } from 'react-icons/io5';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useLocation } from 'react-router-dom'

export default function Header() {

    let location = useLocation();
    location = location.pathname.replace("/", "")

    const [page, setPage] = useState(location);
    const { setToken } = useContext(UserContext);
    const navigate = useNavigate();

    function toPage(page) {
        setPage(page);
        navigate(`/${page}`);
    }

    function logOut() {

        const confirm = window.confirm("Tem certeza que deseja sair ?");

        if (!confirm)
        return;

        localStorage.clear();
        setToken(null);
        navigate("/");
    }

    return (
        <Box
            component="header"
            sx={(theme) => ({
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: 60,
                borderBottom: `1px solid ${theme.colors.gray[3]}`,
                backgroundColor: theme.white,
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
                justifyContent: 'space-between',
            })}
        >
            <Group position="apart" sx={{ width: '100%' }}>
                <Group spacing="xl">
                    <Text
                        size="lg"
                        weight={600}
                        sx={(theme) => ({
                            cursor: 'pointer',
                            paddingBottom: 2,
                            borderBottom: page === "dailyPart" ? `3px solid ${theme.black}` : '3px solid transparent',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                borderBottom: `3px solid ${theme.colors.gray[6]}`,
                            },
                            display: 'none',
                        })}
                        onClick={() => toPage("dailyPart")}
                    >
                        Diário de Equipamentos
                    </Text>
                    <Text
                        size="lg"
                        weight={600}
                        sx={(theme) => ({
                            cursor: 'pointer',
                            paddingBottom: 2,
                            borderBottom: page === "buildDailyPart" ? `3px solid ${theme.black}` : '3px solid transparent',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                borderBottom: `3px solid ${theme.colors.gray[6]}`,
                            },
                        })}
                        onClick={() => toPage("buildDailyPart")}
                    >
                        Diário de Obras
                    </Text>
                </Group>
                <ActionIcon
                    size="lg"
                    onClick={logOut}
                    sx={(theme) => ({
                        '&:hover': {
                            backgroundColor: theme.colors.gray[1],
                        },
                    })}
                >
                    <IoExit size={28} />
                </ActionIcon>
            </Group>
        </Box>
    )
}