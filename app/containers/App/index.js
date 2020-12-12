/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import EmployeeListPage from 'containers/EmployeeListPage';
import EmployeeFormPage from 'containers/EmployeeFormPage';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/employee/list" />} />
        <Route path="/employee/list" component={EmployeeListPage} />
        <Route path="/employee/add" component={EmployeeFormPage} />
        <Route path="/employee/edit/:id" component={EmployeeFormPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
