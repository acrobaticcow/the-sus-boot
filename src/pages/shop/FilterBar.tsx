import { AppstoreFilled, ProfileFilled, FilterFilled } from "@ant-design/icons";
import { Menu, Dropdown, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { MouseEventHandler } from "react";

const onClick = ({ key }: { key: any }) => {
  message.info(`Filter ${key}`);
};

const FilterBar = styled.div`
  margin: 32px 0;
  display: flex;
  justify-content: end;
  align-items: center;
  column-gap: 16px;

  & > span {
    font-size: 1.3em;
    cursor: pointer;
  }

  .text {
      font-weight: 200;
  }

`;

const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="Default">Filter</Menu.Item>
    <Menu.Item key="A-Z">Name: A-Z</Menu.Item>
    <Menu.Item key="Z-A">Name: Z-A</Menu.Item>
    <Menu.Item key="High-Low">Price: High-Low</Menu.Item>
    <Menu.Item key="Low-High">Price: Low-High</Menu.Item>
    <Menu.Item key="Latest">Release: New-Old</Menu.Item>
    <Menu.Item key="Oldest">Release: Old-New</Menu.Item>
  </Menu>
);

export default ({selectBlockLayout, selectListLayout} : {selectBlockLayout: MouseEventHandler<HTMLSpanElement>,
    selectListLayout: MouseEventHandler<HTMLSpanElement>}) => {
  return (
    <FilterBar>
      <AppstoreFilled onClick={selectBlockLayout} />
      <ProfileFilled onClick={selectListLayout} />
      <Dropdown overlay={menu} placement={"bottomRight"}>
        <span
          className="ant-dropdown-link d-flex align-items-center"
          onClick={(e) => e.preventDefault()}
        >
          <span className="text me-5">Filter</span> <DownOutlined />
        </span>
      </Dropdown>
    </FilterBar>
  );
};
