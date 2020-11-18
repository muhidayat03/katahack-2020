
import styled from 'styled-components';
import LogoImage from '../assets/logo2.png';

export default ({ style, src }) => <Logo style={style} src={LogoImage} />;
const Logo = styled.img`
  /* max-width: 100%; */
  object-fit: contain;
  position: relative;
  height: 30px;
`;

Logo.defaultProps = {
  src: LogoImage
};