import styled from 'styled-components';

//style for the BurgMenu
export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background:  rgba(80, 80, 80, 0.0);
  transform: ${({ open }) => open ? 'translateY(0)' : 'translateY(-100%)'};
  height: auto;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 100%;
  }
  a {
      font-size: 2rem;
      text-transform: uppercase;
      padding: 2rem 0;
      font-weight: bold;
      letter-spacing: 0.5rem;
      color: ${({ theme }) => theme.primaryDark};
      text-decoration: none;
      transition: color 0.3s linear;
      @media (max-width: ${({ theme }) => theme.mobile}) {
        font-size: 1.5rem;
        text-align: center;
    }
      &:hover {
        color: ${({ theme }) => theme.primaryHover};
    }
  }
`;