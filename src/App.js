import Logo from './components/Logo';
import './App.css';
import styled from 'styled-components';
import React, { useState } from 'react';
import { Switch, Route, NavLink } from "react-router-dom";
import Login from './pages/login/Login';
import PrivateRoute from './components/PrivateRoute';
import Partner from './pages/partner/Partner';
import Category from './pages/category/Category';
import Invoice from './pages/invoice/Invoice';
import Product from './pages/product/Product';
import NotFound from './components/NotFound';



const Layout = ({ isopen, setOpen }) =>

  <LayoutRoot>
    <Header >
      <div>
        <a href="#">
          <Logo    />
        </a>
      </div>

    </Header>
    <Sidebar open={isopen}>
      <LinkWrapper>
        <LinkList>
          <NavLink to="/partner" activeClassName="selected" onClick={() => setOpen(false)}>
            <LinkItem>
              Partner
          </LinkItem>
          </NavLink>
          <NavLink to="/invoice" activeClassName="selected" onClick={() => setOpen(false)}>
            <LinkItem>
              Invoice
          </LinkItem>
          </NavLink>
          <NavLink to="/product" activeClassName="selected" onClick={() => setOpen(false)}>
            <LinkItem>
              Product
          </LinkItem>
          </NavLink>
          <NavLink to="/category" activeClassName="selected" onClick={() => setOpen(false)}>
            <LinkItem>
              Category
          </LinkItem>
          </NavLink>
        </LinkList>
      </LinkWrapper>
    </Sidebar>
    <BurgerWrapper open={isopen} onClick={() => setOpen(!isopen)}>
      <Burger open={isopen} setOpen={setOpen}>
        <div></div>
        <div></div>
        <div></div>
      </Burger>
    </BurgerWrapper>
    <Overlay open={isopen} onClick={() => setOpen(false)} />
    <Switch>
      <PrivateRoute path="/partner" component={Partner} />
      <PrivateRoute path="/product" component={Product} />
      <PrivateRoute path="/category" component={Category} />
      <PrivateRoute path="/invoice" component={Invoice} />
      <PrivateRoute path="/" exact component={() => <div>Dashboard</div>} />
      <PrivateRoute component={NotFound} />
    </Switch>
  </LayoutRoot>


function App() {
  const [isopen, setOpen] = useState(false);
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={() => <Login isRegis={true} />} />
      <Route component={() => <Layout isopen={isopen} setOpen={setOpen}></Layout>} />
    </Switch>
  );
}

const Header = styled.header`
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  position: fixed;
  left: 0px;
  padding: 0px 24px;
  transition: all 0.3s ease 0s;
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(226, 230, 232);
  top: 0px;
  width: 100%;
  z-index: 90;
  height: 64px;
`;

const LayoutRoot = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  padding-top: 64px;
  background-color: rgb(246, 247, 248);
   
  @media(max-width:1023px){
    flex-direction: column;
  }

`;

const Sidebar = styled.div` 
  width: 192px;
  height: calc(100vh - 64px); 
  padding: 24px 16px;
  z-index: 2;
  overflow-y: auto; 
  border-right: 1px solid rgb(226, 230, 232);
  background-color: rgb(255, 255, 255);
  transition: transform 0.3s ease 0s;

 
  @media(max-width:1023px){
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;     
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease 0s;
    z-index: 999;
    border: none;
    height: 100vh
  } 
`;



const LinkWrapper = styled.ul`
  display: block;
  list-style-type: none;
  margin: 8px 0px;
  padding: 0px;
  transition: all 0.3s ease 0s;
`;

const LinkList = styled.li`
  list-style-type: none;
`;

const LinkItem = styled.div`
  display: block;
  padding: 8px;
  border: 1px solid transparent;
  border-radius: 4px;
  font-weight: 300;
  color: rgb(72, 76, 79);
  font-size:85%;
  cursor: pointer;
  :hover {
    text-decoration: none;
    background-color: rgb(246, 247, 248);
  }

`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  // position: relative;
  padding: 40px;
  background-color: rgb(246, 247, 248);
  transition: transform 0.3s ease 0s;

`;

const BurgerWrapper = styled.div`
  display:none;
  justify-content:center;
  align-items:center;
  position: fixed;
  top: 80px;
  left: ${({ open }) => open ? '190px' : '-2px'};
  width: 40px;
  height: 40px;
  background-color: rgb(255, 255, 255); 
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 8px 0px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  z-index: 998;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  @media(max-width:1023px){
    display:flex;
  }
`;

export const Burger = styled.button`
  
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 18px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 18px;
    height: 2px;
    background: #484C4F;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      // transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
      transition: all 0s
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const Overlay = styled.div`
  visibility: hidden;
  @media(max-width:1023px){
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 997;
    opacity: ${({ open }) => open ? 1 : 0};
    visibility: ${({ open }) => open ? 'visible' : 'hidden'};
    transition: all 0.3s ease 0s;
  }
`;

const ContentConteiner = styled.div`
  width: 100%;
  height: 200px;
  margin: 0 auto;
  // background-color: red;
  @media (min-width: 1280px) {
    max-width: 920px;
  }
  @media (min-width: 1366px) {
    max-width: 990px;
  }
  @media (min-width: 1440px) {
    max-width: 1160px;
  }

 
`;

const Title = styled.h1` 
  font-size: 1.75rem; 
  font-weight: 500;
  letter-spacing: -0.01em;
  color: #2B2F33;
  line-height: 1.125em;
  margin-bottom: 40px;
`;
export default App;


