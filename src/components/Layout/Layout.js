import React from "react";

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Routes from "../../routes/Routers";

import Carts from "../UI/cart/Carts.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Layout = () => {
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && user.userId) {
      // Sync cart changes to backend when a user is logged in
      const syncCart = async () => {
        try {
          const payload = {
            items: cartItems.map(item => ({
              productId: item.id,
              title: item.title,
              image01: item.image01,
              price: item.price,
              quantity: item.quantity,
              totalPrice: item.totalPrice
            }))
          };
          
          await fetch(`http://localhost:5050/cart/${user.userId}/sync`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });
        } catch (error) {
          console.error("Failed to sync cart", error);
        }
      };
      
      syncCart();
    }
  }, [cartItems, user]);

  return (
    <div>
      <Header />

      {showCart && <Carts />}

      <div>
        <Routes />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
