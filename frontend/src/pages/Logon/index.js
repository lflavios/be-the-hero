import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.nome);

      history.push('/profile');

    } catch (err) {
      alert('Falha no logon, tente novamente');
    }
  }

  return (
    <div className="logon-container">
    <section className="form">
      <img src={logoImg} alt="Be The Heroe"/>

      <form onSubmit={handleLogin}>
        <h1>Fa√ßa seu logon</h1>

        <input 
          placeholder="Sua ID" 
          value={id}
          onChange={e => setId(e.target.value)}
        />

        <button className="button">Entrar</button>

        <Link className="back-link" to="/cadastro">
          <FiLogIn size={16} color="#E02041" />N„o tenho cadastro
        </Link>

      </form>
    </section>
    <img src={heroesImg} alt="Heroes"/>
  </div>

  )
}