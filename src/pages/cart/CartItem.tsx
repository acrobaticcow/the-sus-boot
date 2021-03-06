import styled from "styled-components";
import { Row, Col, InputNumber, Dropdown, Menu } from "antd";
import { DeleteOutlined, DownOutlined } from "@ant-design/icons";
import { iCart } from "../../utils/addToCart";
import { accent } from "../../rootStyledComponents";
import { addToCartSlice, delFromCartSlice } from "../../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../slices/rootReducer";
import StyledInputNumber from "../../components/InputNumber";
export default ({ item }: { item: iCart }) => {
  const dispatch = useDispatch();
  const handleMenuClick = ({ key }: { key: string }) => {
    dispatch(addToCartSlice({ ...item, options: key }));
  };
  const clickIncrement = () => {
    if (item.qty == 10) return;
    dispatch(addToCartSlice({ ...item, qty: item.qty + 1 }));
  };
  const clickDecrement = () => {
    if (item.qty == 1) return;
    dispatch(addToCartSlice({ ...item, qty: item.qty - 1 }));
  };
  const menu = (
    <Menu
      defaultSelectedKeys={[item.options]}
      selectedKeys={[item.options]}
      onClick={handleMenuClick}
    >
      {item.colorway.map((color: string) => (
        <Menu.Item key={color}>{color}</Menu.Item>
      ))}
    </Menu>
  );
  const handleNumberChange = (e: number) => {
    dispatch(addToCartSlice({ ...item, size: e }));
  };
  const handleDelClick = () => {
    dispatch(delFromCartSlice(item));
  };
  return (
    <>
      <Wrapper>
        <Col lg={6} md={23} sm={23} xs={23} className="product-left d-flex">
          <div className="img-wrapper">
            <img src={item.thumbImg} alt={item.name} />
          </div>
          <Info>
            <div className="name">{item.name}</div>
            <div className="size d-flex">
              <span className="prefix-txt">Size: </span>
              <InputNumber
                onChange={(e) => handleNumberChange(e)}
                bordered={false}
                min={36}
                max={46}
                size="small"
                defaultValue={item.size}
                controls={false}
              />
            </div>
            <Dropdown
              destroyPopupOnHide={true}
              placement="bottomRight"
              overlay={menu}
              trigger={["click"]}
            >
              <span
                className="ant-dropdown-link d-flex align-items-center"
                onClick={(e) => e.preventDefault()}
              >
                <span className="prefix-txt">Color: </span>
                <span className="text">{item.options}</span> <DownOutlined />
              </span>
            </Dropdown>
          </Info>
        </Col>
        <Col lg={6} md={0} sm={0} xs={0} className="retail-price price d-flex">
          <span>$ {item.price}</span>
        </Col>
        <Col lg={5} md={{span: 0, order:3}} sm={{span: 0, order:3}} xs={{span: 0, order:3}} className="inputNumber">
          <StyledInputNumber
            qty={item.qty}
            clickDecrement={clickDecrement}
            clickIncrement={clickIncrement}
          />
        </Col>
        <Col lg={6} md={{span: 0, order:3}} sm={{span: 0, order:3}} xs={{span: 0, order:3}} className="total-price price">
          $ {item.price * item.qty}
        </Col>
        <Col xs={{span: 1, order:2}} sm={{span: 1, order:2}} md={{span: 1, order:2}} lg={{span: 1, order:5}} className="d-flex align-items-center">
        <DeleteOutlined onClick={handleDelClick} />
      </Col>
      </Wrapper>

    </>
  );
};

const RelativeWrapper = styled.div`
position: relative;
&:last-child {
  position: absolute;
  top: 0;
  left: 0;
}
`

const Wrapper = styled(Row)`
  font-size: 1em;
  width: 100%;
  .img-wrapper {
    width: min(100px, 74px);
    @media (max-width: 678px) {
      width: 74px;
    }
  }
  .ant-dropdown-link .text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .product-left {
    column-gap: 16px;
  }
  > *:not(:first-child) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .price {
    font-size: 1.2em;
    font-weight: 500;
  }
  .retail-price {
    @media (max-width: 992px) {
      span {
        display: none;
      }
    }
  }
  .inputNumber {
    @media (max-width: 992px) {
      margin-block-start: 16px;
    }
  }
  .total-price {
    @media (max-width: 992px) {
      margin-block-start: 16px;
      margin-inline-start: auto;
      writing-mode: horizontal-tb;
    }
  }
`;
const Info = styled.div`
  .size {
    margin-top: 8px;
    margin-bottom: 4px;
    &,
    & + * {
      cursor: pointer;
    }
  }
  .name {
    font-size: max(1.1em, 1.2em);
    color: ${accent};
    font-weight: 600;
  }
  .prefix-txt {
    font-weight: 500;
    margin-right: 4px;
  }
  .text {
    margin-right: 8px;
  }
`;
