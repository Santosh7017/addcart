import React from "react";
import CartItem from "./CartItem";


const Cart = (props) => { // class CartItem extends React.Component{}


    const { products } = props;
    return (
        <div className="cart">
            {/* <CartItem qty={1} price= {99} title={"watch"} img={''}/> */}
            {products.map((product) => {
                return (
                    < CartItem product={product}
                        key={product.id}
                        onDecreaseQuantity={props.onDecreaseQuantity}
                        onIncreaseQuantity={props.onIncreaseQuantity}
                        onDelete={props.onDelete}
                    />
                )
            }
            )}
        </div>

    );


}


export default Cart;