import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { api } from "../api/baseApi"; // Import the api object
import { StoreItem } from "../components/StoreItem";

// Define the type for a store item
type StoreItemProps = {
  id: number;
  title: string;
  price: number;
  imgUrl: string;
  discountRate: number;
};

function Store() {
  const [storeItems, setStoreItems] = useState<StoreItemProps[]>([]);

  useEffect(() => {
    api
      .getCartItems()
      .then((response) => {
        setStoreItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching store items:", error);
      });
  }, []);

  return (
    <>
      <h1>Book Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {storeItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Store;
