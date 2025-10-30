import { Box, Group, Text, ActionIcon } from '@mantine/core';
import { IoExit } from 'react-icons/io5';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext.jsx";
import { useLocation } from 'react-router-dom'

export default function Header() {

    let location = useLocation();
    location = location.pathname.replace("/", "")

    const [page, setPage] = useState(location);
    const [isHovered, setIsHovered] = useState(false);
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
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: 60,
                borderBottom: '1px solid #dee2e6',
                backgroundColor: '#ffffff',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
                justifyContent: 'space-between',
            }}
        >
            <Group spacing="xl">
                <Text
                    size="lg"
                    weight={600}
                    style={{
                        cursor: 'pointer',
                        paddingBottom: 2,
                        borderBottom: page === "dailyPart" ? '3px solid #000000' : '3px solid transparent',
                        transition: 'all 0.2s ease'
                    }}
                    onClick={() => toPage("dailyPart")}
                >
                    Diário de Equipamentos
                </Text>
                <Text
                    size="lg"
                    weight={600}
                    style={{
                        cursor: 'pointer',
                        paddingBottom: 2,
                        borderBottom: page === "buildDailyPart" ? '3px solid #000000' : '3px solid transparent',
                        transition: 'all 0.2s ease',
                    }}
                    onClick={() => toPage("buildDailyPart")}
                >
                    Diário de Obras
                </Text>
            </Group>
            <Group>
                <ActionIcon
                    size="lg"
                    onClick={logOut}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                        transition: 'background-color 0.2s ease'
                    }}
                >
                    <IoExit size={28} color='#000' />
                </ActionIcon>
            </Group>
        </Box>
    )
}