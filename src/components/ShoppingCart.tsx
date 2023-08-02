import { useState, useEffect } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import InfiniteScroll from "react-infinite-scroll-component";
import { api } from "../api/baseApi"; // Import the api object

type ShoppingCartProps = {
  isOpen: boolean;
};

function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const [cartItemsFromApi, setCartItemsFromApi] = useState([]); // State for fetched cart items
  const [hasMore, setHasMore] = useState(true);
  const [visibleItems, setVisibleItems] = useState(4);

  useEffect(() => {
    // Fetch cart items from the API when the component mounts
    api
      .getCartItems()
      .then((response) => {
        setCartItemsFromApi(response.data); // Set the fetched cart items
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, []);

  const loadMoreItems = () => {
    if (visibleItems >= cartItemsFromApi.length) {
      setHasMore(false);
      return;
    }
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };

  const allCartItems = [...cartItems, ...cartItemsFromApi]; // Combine local and API cart items

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          <InfiniteScroll
            dataLength={visibleItems}
            next={loadMoreItems}
            hasMore={hasMore}
            loader={<p>Loading...</p>}
            endMessage={<p>No more items</p>}
          >
            {allCartItems.slice(0, visibleItems).map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </InfiniteScroll>
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              allCartItems.reduce((total, cartItem) => {
                // Calculate total based on the combined cart items
                return total + (cartItem.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;
