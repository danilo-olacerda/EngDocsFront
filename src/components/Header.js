import styled from "styled-components"
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
        <Container>
            <span>
                <DailyPart page={page} onClick={()=> toPage("dailyPart")}>
                    Diario de Equipamentos
                </DailyPart>
                <BuildDailyPart page={page} onClick={()=> toPage("buildDailyPart")}>
                    Diario de Obras
                </BuildDailyPart>
            </span>
            <span>
                <IoExit size={40} onClick={logOut}/>
            </span>
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
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
    display: none;
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