import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import SingIn from '../Pages/SingIn';
import SingUp from '../Pages/SingUp';
import useAuth from '../Hooks/useAuth';

const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed > 0 ? <Item /> : <SingIn />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/home" element={<Private Item={Home} />} />
          <Route path="/" element={<SingIn />} />
          <Route exact path="/signUp" element={<SingUp />} />
          <Route exact path="*" element={<SingIn />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
