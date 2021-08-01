import React from 'react';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Title, Paragrafo } from './styled';
import * as exampleActions from '../../store/modules/example/actions';
import axios from '../../services/axios';

export default function Login() {
  const dispatch = useDispatch();

  async function getData() {
    const response = await axios.get('/funcionarios');
    console.log(response);
  }

  const handleClick = (e) => {
    getData();
    e.preventDefault();
    dispatch(exampleActions.clicaBotaoRequest());
  };

  return (
    <Container>
      <Title>
        Login
        <small>Oie</small>
      </Title>
      <Paragrafo>Lorem ipsum dolor sit amet.</Paragrafo>

      <button type="button" onClick={handleClick}>
        Enviar
      </button>
    </Container>
  );
}
