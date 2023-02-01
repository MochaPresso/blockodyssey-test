import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../styles/List.scss";

const List = () => {
  const [productList, setProductList] = useState(null);
  const { searchCondition, searchKeyword } = useSelector((state) => state.currentState);
  const filteredProductList =
    searchKeyword.length === 0
      ? productList?.products
      : searchCondition === "all"
      ? productList?.products.filter((product) => {
          const condition = [
            product.title.toLowerCase(),
            product.brand.toLowerCase(),
            product.description.toLowerCase(),
          ];

          for (const elem of condition) {
            if (elem.includes(searchKeyword)) {
              return true;
            }
          }

          return false;
        })
      : productList?.products.filter((product) =>
          product[searchCondition].toLowerCase().includes(searchKeyword)
        );

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/dummyData.json");
        setProductList(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="List">
      <div className="List-total">
        검색된 데이터: {filteredProductList && filteredProductList.length}건
      </div>
      <div className="List-table">
        <div className="List-table-head">
          <div>상품 번호</div>
          <div>상품명</div>
          <div>브랜드</div>
          <div>상품 내용</div>
          <div>가격</div>
          <div>평점</div>
          <div>재고</div>
        </div>
        <div className="List-table-body">
          {filteredProductList &&
            filteredProductList.map(({ id, title, brand, description, price, rating, stock }) => (
              <div className="List-table-content" key={id}>
                <div>{id}</div>
                <div>{title}</div>
                <div>{brand}</div>
                <div className="List-table-content-description">{description}</div>
                <div>${price}</div>
                <div>{rating}</div>
                <div>{stock}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default List;
