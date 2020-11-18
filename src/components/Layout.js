import styled from 'styled-components';

export const Main = styled.div`
display: flex;
flex-direction: column;
flex: 1 1 auto; 
padding: 40px;
background-color: rgb(246, 247, 248);
transition: transform 0.3s ease 0s;
margin-left:192px;
@media(max-width:1023px){  
margin-left:0;
  
} 

`;



export const ContentConteiner = styled.div` 
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

export const Title = styled.h1`
font-size: 1.75rem; 
font-weight: 500;
letter-spacing: -0.01em;
color: #2B2F33;
line-height: 1.125em; 
`;

export const PaginationContainer = styled.div`
display: flex;
width: 100%; 
justify-content: center;
margin-top: 20px;
`;

export const ButtonContaienr = styled.div`
display: flex;
width: 100%; 
justify-content: space-between;
align-items: center;
margin-bottom: 40px;
`;