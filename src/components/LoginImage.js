
import styled, {keyframes} from 'styled-components';
import TasBiru from '../assets/Asset 1.png'
import Koin from '../assets/Asset 2.png'
import TasMerah from '../assets/Asset 3.png'
import Kado from '../assets/Asset 4.png'
import Leptop from '../assets/Asset 5.png'

export default ()=>  <ImageContainer>
<AnimatedImage style={{animationDelay:'0s'}} src={Leptop} width="80%"></AnimatedImage>
<AnimatedImage style={{animationDelay:'.5s', position: 'absolute', top:'18%', left: '5%'}} src={TasBiru} width="20%"></AnimatedImage>
<AnimatedImage style={{animationDelay:'1s', position: 'absolute', top:'80%', left: '70%'}} src={TasMerah} width="24%"></AnimatedImage>
<AnimatedImage style={{animationDelay:'1.5s', position: 'absolute', top:'80%', left: '20%'}} src={Koin} width="20%"></AnimatedImage>
</ImageContainer>; 




const updown = keyframes`
  0% {
    transform: translatey(0);
  }
  50% {
    transform: translatey(-10px);
  }
  100% {
    transform: translatey(0);
  } 
`;

const ImageContainer = styled.div` 
  margin-top: 40px;
  width : 60%;
  position: relative;
  // background-color:#eee;
  display: flex;
  justify-content: center;
  align-items: center;
  // height: 100%;
  @media(max-width: 1024px){
    margin-top: 40px;
    width: 30%;
  }
  @media(max-width: 700px){
    margin-top: 40px;
    width: 40%;
  }
`;
 

const AnimatedImage = styled.img`
  animation: ${updown} 4s ease infinite;
`;