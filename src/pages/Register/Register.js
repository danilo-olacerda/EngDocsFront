
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from  'react-loader-spinner';
import { Container, LoginPage } from "./styles";
import { register } from "../../services/authService";

export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [companyCEP, setCompanyCEP] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function send(e) {

        e.preventDefault();

        setLoading(true);

        if (password!==confirmPassword) {
            alert("As senhas não conferem!");
            setLoading(false);
            return;
        }

        const body = {
            name,
            email,
            password,
            confirmPassword,
            companyName,
            companyAddress,
            companyCEP
        };

        try {
            
            await register(body);
            alert("Cadastro realizado com sucesso!");
            setLoading(false);
            navigate("/");

        } catch (error) {
            if (error.response.data === "Email already in use") {
                alert("Esse email já está cadastrado!");
                return;
            }
            
            alert("Erro ao cadastrar!");
        } finally {
            setLoading(false);
        }

    }

    return (
        <Container>
            <h1>EngDocs</h1>
            <form action="submit" onSubmit={send}>
                <input type="name" disabled={loading} placeholder="Nome" required value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="email" disabled={loading} placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" minLength="10" disabled={loading} placeholder="Senha" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" minLength="10" disabled={loading} placeholder="Confirme a senha" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                <input type="text" disabled={loading} placeholder="Nome da empresa" required value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
                <input type="text" disabled={loading} placeholder="Endereço da empresa" required value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)}/>
                <input type="tel" maxLength="9" disabled={loading} placeholder="CEP da empresa (apenas números)" required value={companyCEP} onChange={(e) => setCompanyCEP(e.target.value)}/>
                <button type="submit" disabled={loading}>
                    {!loading ? <h3>Cadastrar</h3> : <ThreeDots color="#FFFFFF" height={60} width={60} />}
                </button>
            </form>
            <LoginPage onClick={() => navigate("/")} enabled={loading}>Empresa já cadastrada ? Faça login!</LoginPage>
        </Container>
    )
};