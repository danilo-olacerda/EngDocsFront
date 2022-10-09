import Header from '../../components/Header';
import styled from 'styled-components';

export default function Home() {

    return (
        <>
            <Header />
            <Container>
                <h1>Bem vindo(a) ! Selecione uma opção acima para navegar entre os registros.</h1>
            </Container>
        </>
    )

}

const Container = styled.div`
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    h1 {
        text-align: center;
    }
`;