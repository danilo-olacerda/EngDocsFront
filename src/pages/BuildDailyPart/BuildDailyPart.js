import Header from '../../components/Header';
import { getBuildDailyParts, deleteBuildDailyPart } from '../../services/dailyService';
import { generateBuildDailyPartPDF } from '../../services/pdfService';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import { Box, Container, Button, Table, ActionIcon, Group, Loader, Center } from '@mantine/core';
import dayjs from 'dayjs';
import { AiFillEdit, AiFillFilePdf } from 'react-icons/ai';
import { BsTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function BuildDailyPart(){

    const [buildDailyParts, setBuildDailyParts] = useState([{build: {}}]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { token } = useContext(UserContext);

    useEffect(() => {

        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        getBuildDailyParts(header).then(response => {
            handleDate(response);
            setLoading(false);
        })
        .catch(error => {
            if(error.response.status === 401){
                alert('Sua sessão expirou, faça login novamente');
                window.location.href = '/';
            }
            setLoading(false);
        });

    }, [token]);

    function handleDate(items) {

        items.sort((a,b) => new Date(b.date) - new Date(a.date));

        for(let item of items) {
            item.date = dayjs(item.date).format('DD/MM/YYYY');
        }

        setBuildDailyParts(items);

    }

    async function handleDelete(id){
        const confirm = window.confirm('Tem certeza que deseja excluir o registro ?');
        if(!confirm) return;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        try {
            
            await deleteBuildDailyPart(id, config);
            alert('Registro excluído com sucesso');
            buildDailyParts.splice(buildDailyParts.findIndex(item => item.id === id), 1);
            setBuildDailyParts([...buildDailyParts]);

        } catch (error) {

            if(error.response.status === 401){
                alert('Sua sessão expirou, faça login novamente');
                navigate('/');
            } else {
                alert('Não foi possível excluir o registro');
            }

        }
    }

    function generatePDF(buildDailyPartPDF){
        generateBuildDailyPartPDF(buildDailyPartPDF);
    }

    return(
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
                <Container size="xl">
                    <Button
                        fullWidth
                        size="lg"
                        color="dark"
                        onClick={() => navigate("/buildDailyPart/new")}
                        sx={{
                            backgroundColor: '#000000',
                            marginBottom: 24,
                            '&:hover': {
                                backgroundColor: '#2c2c2c',
                            },
                        }}
                    >
                        Adicionar nova
                    </Button>

                    {loading ? (
                        <Center style={{ minHeight: 200 }}>
                            <Loader size="lg" color="dark" />
                        </Center>
                    ) : (
                        <Table 
                            striped 
                            highlightOnHover
                            withTableBorder
                            withColumnBorders
                            sx={(theme) => ({
                                backgroundColor: '#ffffff',
                                '& thead tr th': {
                                    backgroundColor: '#f5f5f5',
                                    color: '#000000',
                                    fontWeight: 600,
                                    borderBottom: '2px solid #e0e0e0',
                                },
                                '& tbody tr:hover': {
                                    backgroundColor: '#fafafa',
                                },
                            })}
                        >
                            <thead>
                                <tr>
                                    <th style={{ width: '15%' }}>Data</th>
                                    <th style={{ width: '55%' }}>Obra</th>
                                    <th style={{ width: '30%' }}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {buildDailyParts.length === 0 || !buildDailyParts[0].date ? (
                                    <tr>
                                        <td colSpan={3} style={{ textAlign: 'center', padding: 40 }}>
                                            Nenhum registro encontrado
                                        </td>
                                    </tr>
                                ) : (
                                    buildDailyParts.map((buildDailyPart, index) => (
                                        <tr key={index}>
                                            <td>{buildDailyPart.date}</td>
                                            <td>{buildDailyPart.build?.name || 'N/A'}</td>
                                            <td>
                                                <Group spacing="sm">
                                                    <ActionIcon 
                                                        color="dark" 
                                                        variant="subtle"
                                                        size="lg"
                                                    >
                                                        <AiFillEdit size={20} />
                                                    </ActionIcon>
                                                    <ActionIcon 
                                                        color="red" 
                                                        variant="subtle"
                                                        size="lg"
                                                        onClick={() => handleDelete(buildDailyPart.id)}
                                                    >
                                                        <BsTrashFill size={18} />
                                                    </ActionIcon>
                                                    <ActionIcon 
                                                        color="dark" 
                                                        variant="subtle"
                                                        size="lg"
                                                        onClick={() => generatePDF(buildDailyPart)}
                                                    >
                                                        <AiFillFilePdf size={22} />
                                                    </ActionIcon>
                                                </Group>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    )}
                </Container>
            </Box>
        </>
    )
}