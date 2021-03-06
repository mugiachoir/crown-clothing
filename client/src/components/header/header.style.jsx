import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
  align-items: center;
`;

export const LogoContainer = styled(Link)`
  width: 70px;
  padding: 25px;
`;

export const OptionsContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  padding-bottom: 5px;
  cursor: pointer;
  color: rgb(122, 122, 122);

  :hover {
    font-weight: bold;
  }

  &.active {
    font-weight: bold;
    color: black;
    border-bottom: 2px solid black;
  }
`;
