import styled from "styled-components"
import { IoExit } from 'react-icons/io5';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {

    const [page, setPage] = useState("home");
    const navigate = useNavigate();

    function toPage(page) {
        setPage(page);
        navigate(`/${page}`);
    }

    return (
        <Container>
            <span>
                <DailyPart page={page} onClick={()=> toPage("dailyPart")}>
                    Parte de Equipamentos
                </DailyPart>
                <BuildDailyPart page={page} onClick={()=> toPage("buildDailyPart")}>
                    Parte de Obras
                </BuildDailyPart>
            </span>
            <span>
                <IoExit size={40}/>
            </span>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 0 5px #000;
    padding: 0 10px;
    span {
        cursor: pointer;
        display: flex;
    }
`;

const DailyPart = styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    text-align: center;
    margin-right: 30px;
    border-bottom: ${props => props.page === "dailyPart" ? "2px solid red" : "none"};
    :hover {
        border-bottom: 2px solid #000;
    }
`;

const BuildDailyPart = styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    text-align: center;
    margin-right: 30px;
    border-bottom: ${props => props.page === "buildDailyPart" ? "2px solid red" : "none"};
    :hover {
        border-bottom: 2px solid #000;
    }
`;