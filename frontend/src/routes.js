import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Cadastro from './pages/Cadastro';
import Profile from './pages/Profile';
import NovoCaso from './pages/NovoCaso';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/cadastro" component={Cadastro} />

        <Route path="/profile" exact component={Profile} />
        <Route path="/casos/novo" component={NovoCaso} />

      </Switch>
    </BrowserRouter>
  );
}