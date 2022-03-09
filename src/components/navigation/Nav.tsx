import { Link, useNavigate } from "react-router-dom";
import { baseFontSize, height } from "../../rootStyledComponents";
import styled from "styled-components";
import MainNavLinkHolders from "./MainNavLinkHolders";
import {
  SearchOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import CartDrawer from "../cartDrawer/CartDrawer";
import { useState } from "react";
import { Badge, Dropdown, Menu, Space } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../slices/rootReducer";
import { accent } from "../../rootStyledComponents";
import InputDrawer from "../searchDrawer/InputDrawer";
import { NavLink } from "./FeaturedList";

const { SubMenu } = Menu;

const menu = (onClick: () => void) => (
  <Menu>
    <SubMenu onTitleClick={onClick} title={"Featured"}>
      <Menu.Item>
        <NavLink to="#">Featured</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="#">Best Seller</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="#">Back in Stock</NavLink>
      </Menu.Item>
    </SubMenu>
    <SubMenu onTitleClick={onClick} title={"Brand"}>
      <Menu.Item>
        <NavLink to="/shop?search=adidas">Adidas</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/shop?search=converse">Converse</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/shop?search=nike">Nike</NavLink>
      </Menu.Item>
    </SubMenu>
  </Menu>
);

export default () => {
  const { cart } = useSelector((state: RootState) => state);
  const [visible, setVisible] = useState(false);
  const [searchVisible, setSearchvisible] = useState(false);
  const navigate = useNavigate();
  const showDrawer = () => {
    setVisible(true);
  };
  const showSearch = () => {
    setSearchvisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const closeSearch = () => setSearchvisible(false);

  return (
      <Header id="nav" className="fg-reg d-flex align-items-center justify-content-between">
        <Link
          className=" order-md-1 order-2  "
          style={{ maxWidth: "min(190px, 100%)" }}
          to="/"
        >
          <Logo src={logoUrl} alt="the sus" />
        </Link>
        <Nav className="d-flex order-md-2 order-1">
          <MainNavLinkHolders />
          {/* <Space align="center">
            <Dropdown
              className="dropdown"
              overlay={() => menu(handleTitleClick)}
              overlayStyle={{width: "150px"}}
            >
              <Link to="/shop">Shop</Link>
            </Dropdown>
          </Space> */}
        </Nav>
        <HeaderIcons className="order-md-3 order-3  ">
          <SearchOutlined className="search-icon" onClick={showSearch} />
          <UserOutlined />
          <Badge count={cart.length}>
            <ShoppingOutlined onClick={showDrawer} />
          </Badge>
          <InputDrawer onClose={closeSearch} visible={searchVisible} />
          <CartDrawer onClose={onClose} visible={visible} />
        </HeaderIcons>
      </Header>
  );
};

export const logoUrl =
  "https://cdn.shopify.com/s/files/1/0665/2889/files/Thesus_A_W_Wordmark_Forest_Green_2cca776c-1727-4416-868a-fa72e7359f08.png?v=1635783797";

export const Logo = styled.img`
  max-width: min(195px, 100%);
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: left center;
`;

const Nav = styled.nav`
  height: 100%;
  font-size: 16px;
  font-weight: 500;
  color: ${accent};
`;

const Header = styled.header`
  position: fixed;
  z-index: 99 ;
  padding: 0 ${baseFontSize};
  height: ${height};
  min-height: max(${height}, 4em);
  background-color: white;
  box-shadow: 0 2px 10px rgb(0 0 0 / 8%);
`;

const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  height: 100%;
  .search-icon {
    cursor: pointer;
  }
  svg {
    display: block;
    width: 100%;
    height: fit-content;
    font-size: 1.5em;
  }
  @media (max-width: 768px) {
    & > *:first-of-type + * {
      display: none;
      // hide icon "user"
    }
  }
`;

const Dflex = styled.div`
  display: flex;
`;
