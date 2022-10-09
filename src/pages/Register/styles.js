import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: lightgray;
  width: 100%;
  min-height: 100%;
  form {
    display: flex;
    flex-direction: column;
    width: 40%;
    margin-bottom: 36px;
  }
  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 42px;
    line-height: 50px;
    color: #FFFFFF;
    margin-bottom: 24px;
  }
  input {
    border: none;
    margin-bottom: 13px;
    background: #FFFFFF;
    border-radius: 5px;
    height: 48px;
    padding-top: 18px;
    padding-bottom: 17px;
    padding-left: 15px;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
    outline: none;
  }
  input::placeholder {
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: blue;
    border-radius: 5px;
    height: 46px;
    cursor: pointer;
    h3 {
      font-weight: 600;
      font-size: 20px;
      line-height: 23px;
      color: #FFFFFF;
    }
  }
  @media (max-width: 811px) {
    form {
        width: calc(100% - 50px);
    }
  }
`;
const LoginPage = styled.p`
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  color: #FFFFFF;
  pointer-events: ${props => props.enabled ? "none" : "initial"};
  cursor: pointer;
`;

export { Container, LoginPage };