import Header from '../../components/Header';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import { getDailyParts } from '../../services/dailyService';
import dayjs from 'dayjs';
import { AiFillEdit, AiFillFilePdf } from 'react-icons/ai';
import { BsTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function DailyPart(){

    const [dailyParts, setDailyParts] = useState([{build: {}}]);
    const navigate = useNavigate();
    const { token } = useContext(UserContext);

    useEffect(() => {

        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        getDailyParts(header).then(response => {
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

        for(let item of items) {
            item.date = dayjs(item.date).format('DD/MM/YYYY');
        }

        setDailyParts(items);

    }

    return(
        <>
            <Header />
            <Container>
                <AddButton onClick={()=> navigate("/dailyPart/new")}>
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
                        {dailyParts.map((dailyPart, index) => (
                            <tr key={index}>
                                <td width="10%">{dailyPart.date}</td>
                                <td width="60%">{dailyPart.build.name}</td>
                                <Actions>
                                    <AiFillEdit size={20}/>
                                    <BsTrashFill size={20}/>
                                    <AiFillFilePdf size={20}/>
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