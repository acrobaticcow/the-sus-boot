import styled from "styled-components";
import { Row, Col, List, Badge, Input, Button } from "antd";
import FloatingLabel from "../../components/floatingLabel/FloatingLabel";
import { useSelector } from "react-redux";
import { RootState } from "../../slices/rootReducer";
import { iCart } from "../../utils/addToCart";
import { useState, useEffect, useRef } from "react";
import {
  borderBlack,
  coolBlack,
  backgroundGrey,
  btnGrey,
} from "../../rootStyledComponents";

const shipping = 3;

export default () => {
  const { cart } = useSelector((state: RootState) => state);
  const [couponValue, setCouponValue] = useState<string | undefined>();
  const imgRef = useRef<any>(null);
  const [imgWidth, setImgWidth] = useState(imgRef.current?.offsetWidth);
  useEffect(() => {
    setTimeout(() => {
      setImgWidth(imgRef.current?.offsetWidth);
    }, 100);
    window.addEventListener("resize", () => {
      setImgWidth(imgRef.current?.offsetWidth);
    });
    return () =>
      window.removeEventListener("resize", () => {
        setImgWidth(imgRef.current?.offsetWidth);
      });
  }, []);
  const total = cart.reduce(
    (accumulator, current) => accumulator + current.price * current.qty,
    0
  );
  return (
    <BackgroundWrapper lg={12} md={24} sm={24} xs={24}>
      <CartItemHolder lg={15}>
        <List
          itemLayout="horizontal"
          dataSource={cart}
          renderItem={(item: iCart) => (
            <List.Item>
              <Row align="middle" gutter={[24, 0]}>
                <ImgWrapper imgWidth={imgWidth} ref={imgRef} lg={3}>
                  <Badge size="small" count={item.qty}>
                    <img src={item.thumbImg} alt={item.name} />
                  </Badge>
                </ImgWrapper>
                <Col className="name-holder" span={18}>
                  <div className="name main-txt">{item.name}</div>
                  <div className="size sub-txt">{item.size}</div>
                  <div className="color sub-txt">{item.options}</div>
                </Col>
                <Col lg={3} className="price main-txt">
                  $ {item.qty * item.price}
                </Col>
              </Row>
            </List.Item>
          )}
        />
        <Coupon>
          <FloatingLabel label="Gift card or discount code" value={couponValue}>
            <Input
              value={couponValue}
              onChange={(e) => setCouponValue(e.target.value)}
              className="input"
            />
          </FloatingLabel>
          <Button className="btn bd-rad-8" size="large">
            Apply
          </Button>
        </Coupon>
        <Subtotal className="main-txt">
          <div className="subtotal">
            <span className="sub-txt">Subtotal</span>
            <span>$ {total}</span>
          </div>
          <div className="shipping">
            <span className="sub-txt">Shipping</span>
            <span>$ {shipping}</span>
          </div>
        </Subtotal>
        <Total>
          <div className="total main-txt">Total</div>
          <div className="total-value">
            <span className="prefix sub-txt">USD</span>
            <span className="value">${total + shipping}</span>
          </div>
        </Total>
      </CartItemHolder>
    </BackgroundWrapper>
  );
};

const Total = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  .total {
    font-size: 16px !important;
  }
  .total-value {
    display: flex;
    align-items: center;
  }
  .total-value .value {
    margin-left: 6px;
    font-size: 18px;
    color: ${coolBlack};
  }
`;

const Subtotal = styled.div`
  padding: 20px 0;
  border-bottom: ${borderBlack};
  > :last-child {
    margin-top: 4px;
  }
  .subtotal,
  .shipping {
    display: flex;
    justify-content: space-between;
  }
`;

const Coupon = styled.div`
  padding: 20px 0;
  display: flex;
  column-gap: 16px;
  align-items: center;
  border-bottom: ${borderBlack};
  .btn {
    padding-left: 24px;
    padding-right: 24px;
    background-color: ${btnGrey};
    span {
      color: white !important;
      font-weight: 100;
    }
    :hover {
      border-color: unset;
      opacity: 0.8;
    }
  }

  /* Force update ant style */
  .ant-input {
    padding: 16px 12px 4px 11px;
    width: 100%;
  }

  .ant-select .ant-select-selector {
    padding: 16px 10px 4px 11px;
  }

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    padding: 16px 10px 4px 11px;
    height: 48px;
  }

  .ant-select-single .ant-select-selector .ant-select-selection-search {
    top: 16px;
  }
`;
const CartItemHolder = styled(Col)`
  padding-top: 92px;
  padding-left: 44px;
  padding-right: 44px;
  background-color: inherit;
  padding-bottom: 8px;
  .ant-list-item {
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  .name-holder {
    @media (max-width: 768px) {
      margin-top: 20px;
    }
  }
  > :first-child {
    border-bottom: ${borderBlack};
    border-width: 2px;
    padding: 8px;
  }
  .price {
    display: flex;
    justify-content: end;
    padding: unset !important;
  }
`;
const ImgWrapper = styled(Col)<{ imgWidth: number }>`
  border: ${borderBlack};
  border-radius: 8%;
  width: 100%;
  height: ${({ imgWidth }) => `${imgWidth}px`};
  display: flex;
  align-items: center;
  /* padding: 0 4px; */
  background-color: white;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const BackgroundWrapper = styled(Col)`
  background-color: ${backgroundGrey};
  box-shadow: 1px 0 0 #e1e1e1 inset;
`;
