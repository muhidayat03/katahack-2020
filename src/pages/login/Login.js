import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, connect } from "react-redux";
import { useHistory } from "react-router-dom";

import styled from 'styled-components'
import Logo from '../../components/Logo';
import LoginImage from '../../components/LoginImage';
import { InputText } from '@kata-kit/form';
import { Button } from '@kata-kit/button';
import { renderInput } from "../../components/form/FormComponent";  
import { reduxForm, Field } from "redux-form";
import { login, logout, register, setMsg, reset } from "../../actions/login_action";
import { Message } from '@aksara-ui/core';
import { IconLock, IconUser, IconMessage } from '@aksara-ui/icons';





let Login = ({ isRegis, handleSubmit }) => {
  const { pending } = useSelector((state) => state.login);
  const testing = useSelector((state) => state);
  const { error: regisError } = useSelector((state) => state.register);
  const loginMsg = useSelector((state) => state.setMsg);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  const getLogin = async (param) => {
    const res = await dispatch(login(param));
    if (res) {
      history.push("/partner");
    }
  }


  const getRegis = async (param) => {
    const res = await dispatch(register(param));
    if (res) {
      dispatch(setMsg('Pendaftaran berhasil!, silahkan masuk dengan akun anda'));
      history.push("/login");
    }
  };



  const changePage = (page) => {
    dispatch(setMsg());
    history.push(page);
  }


  const onSubmit = (values) => {
    if (isRegis) {
      const param = {
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
        name: values.name,
      }
      getRegis(param);
    } else {
      const param = {
        email: values.email,
        password: values.password
      }
      getLogin(param);
    }
  };

  return <LoginWrapper>
    <Container>
      <LogoWrapper>
        <a href="#">
          <Logo style={{ height: 56 }} />
        </a>
      </LogoWrapper>
      <BoxContainer>
        <SideContainer style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <FormContainer>
            {
              isRegis
                ?
                <h1 style={{ fontSize: 32, lineHeight: '40px', marginBottom: 20 }}>Daftar<br />Untuk Bergabung</h1>
                :
                <h1 style={{ fontSize: 32, lineHeight: '40px', marginBottom: 20 }}>Halo, <br />Selamat Datang</h1>
            }
            {loginMsg &&
              <div style={{ marginTop: 20, marginBottom: 20 }}>
                <Message state="success" message={loginMsg} />
              </div>
            }

            {regisError &&
              <div style={{ marginTop: 20, marginBottom: 20 }}>
                <Message state="error" message={regisError} />
              </div>
            }

            <form onSubmit={handleSubmit(onSubmit)}>

              {isRegis &&
                <Field name="name" component={renderInput} placeholder="Name" icon={IconUser} />
              }
              <Field name="email" component={renderInput} placeholder="Email" icon={IconMessage} />
              <Field name="password" component={renderInput} placeholder="Password" type="password" icon={IconLock} />
              {isRegis &&
                <Field name="password_confirmation" component={renderInput} placeholder="Confirm Password" type="password" icon={IconLock} />
              }
              <Button style={{ width: '100%', marginBottom: 24, }} color="primary" type="submit">{isRegis ? 'Daftar' : 'Masuk'}</Button>
            </form>
            {
              isRegis
                ?
                <div>
                  <span>Sudah punya akun? </span>
                  <Link onClick={() => changePage('login')}>
                    Masuk
                  </Link>
                </div>
                :
                <div>
                  <span>Belum punya akun? </span>
                  <Link onClick={() => changePage('register')}>
                    Daftar
                  </Link>
                </div>

            }


          </FormContainer>
        </SideContainer>
        <SideContainer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <LoginImage></LoginImage>
        </SideContainer>
      </BoxContainer>
    </Container>
  </LoginWrapper >
}


const LoginWrapper = styled.div`
  display: flex;
  flex-diraction: column;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`    
  width: 100%; 
  max-width: 1366px;
  height: 80vh; 
  @media(max-width:800px){
    height: 90vh; 
  } 
`;

const BoxContainer = styled.div` 
  display:flex;
  flex-wrap:wrap;
  justify-content:space-around;
  height: 90%;
  width: 100%; 
  @media(max-width:1024px){ 
    // flex-direction: column;
  } 
`;

const SideContainer = styled.div`  
  width: 50%;
  @media(max-width: 1024px){
    width: 100%;
  }
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 40px;
  @media (max-width: 1024px){
    justify-content: center;
    margin-bottom:20px;
  }
  @media (max-width: 800px){ 
    margin-bottom:40px;
  }
`;

const FormContainer = styled.div`
  width: 70%;  
`;



Login = reduxForm({
  form: "Login",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(Login);


function validate(values, tes) {
  const { username, password } = values;
  const errors = {};
  if (!username) {
    errors.username = "Username wajib diisi";
  }
  if (!password) {
    errors.password = "Password wajib diisi";
  }
  return errors;
}

const Link = styled.span`
  color: #006fe6;
  cursor: pointer;
`;


export default Login