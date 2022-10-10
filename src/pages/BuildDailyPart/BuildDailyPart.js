import Header from '../../components/Header';
import { getBuildDailyParts, deleteBuildDailyPart } from '../../services/dailyService';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { AiFillEdit, AiFillFilePdf } from 'react-icons/ai';
import { BsTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function BuildDailyPart(){

    const [buildDailyParts, setBuildDailyParts] = useState([{build: {}}]);
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
        })
        .catch(error => {
            if(error.response.status === 401){
                alert('Sua sessão expirou, faça login novamente');
                window.location.href = '/';
            }
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

    function generatePDF(id){
        console.log("pdf",id);
    }

    return(
        <>
            <Header />
            <Container>
                <AddButton onClick={()=> navigate("/buildDailyPart/new")}>
                    Adicionar nova
                </AddButton>
                <table>
                    <thead>
                        <tr>
                            <th width="10%">Data</th>
                            <th width="60%">Obra</th>
                            <th width="30%">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buildDailyParts.map((buildDailyPart, index) => (
                            <tr key={index}>
                                <td width="10%">{buildDailyPart.date}</td>
                                <td width="60%">{buildDailyPart.build.name}</td>
                                <Actions>
                                    {/* <AiFillEdit size={20}/> */}
                                    <BsTrashFill size={20} onClick={()=>handleDelete(buildDailyPart.id)}/>
                                    <AiFillFilePdf size={20} onClick={()=>generatePDF(buildDailyPart.id)} />
                                </Actions>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>
        </>
    )
}

const Container = styled.div`
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    table {
        margin-top: 20px;
        width: 80%;
        th {
            text-align: left;
            padding: 10px;
            border-bottom: 1px solid #000;
        }
        td {
            padding: 10px;
            border-bottom: 1px solid #000;
        }
    }
`;

const Actions = styled.td`
    width: 30%;
    * {
        margin-right: 5px;
        cursor: pointer;
    }
`;

const AddButton = styled.button`
    width: 80%;
    height: 40px;
    background-color: lightblue;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
`;