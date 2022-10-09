import { Container, RegisterPage } from "./styles.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from  'react-loader-spinner';
import {useContext} from "react";
import UserContext from "../../contexts/UserContext.js";
import { login } from "../../services/authService.js";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(UserContext);

  async function send(e) {
    e.preventDefault();
    setLoading(true);
    const body = {
      email,
      password
    };
    
    try {
        const newToken = await login(body);

        setToken(newToken.token);
        localStorage.setItem("token", JSON.stringify(newToken.token));
        navigate("/home");
        
    } catch (error) {
        alert("Email ou senha incorretos");
    } finally {
        setLoading(false);
    }
    
    
  }

  return (
    <Container>
      <h1>EngDocs</h1>
      <form action="submit" onSubmit={send}>
        <input type="email" disabled={loading} placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" disabled={loading} placeholder="Senha" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" disabled={loading}>
          {!loading ? <h3>Entrar</h3> : <ThreeDots color="#FFFFFF" height={60} width={60} />}
        </button>
      </form>
      <RegisterPage onClick={() => navigate("/register")} enabled={loading}>Criar nova empresa</RegisterPage>
    </Container>
  )
};