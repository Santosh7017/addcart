import React from "react";

const CartItem =(props)=> { 



        // console.log('this.props', this.props);
        const {price,  title, qty} = props.product; // object destructuring

        const {
            product, 
            onIncreaseQuantity,
             onDecreaseQuantity,
             onDelete,
            } = props;
        return (
            <div className="cart-item">
                
                <div className=" left-block">
                    <img style={styles.image} src={product.img} />
                </div>
                <div className="right-block"> 
                <div style={ {fontSize: 25} } >{title}</div>
                <div style={ {color: '#777'} } >{price}</div>
                <div style={ {fontSize: '#777'} } >{qty}</div>
                <div className="cart-item-actions">
                    {/* Buttons */}
                    <img src="https://cdn-icons-png.flaticon.com/512/992/992651.png " alt="increase" className="action-icons" 
                    onClick={() =>{onIncreaseQuantity(product)}}
                    />
                    <img src="https://cdn-icons-png.flaticon.com/512/992/992683.png" alt="decrease" className="action-icons"
                    onClick={() => onDecreaseQuantity(product)}
                    />
                    <img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" alt="delete" className="action-icons" 
                    onClick={() => onDelete(product.id)}
                    />

                </div>
                </div>
            </div>
        )
    

}
const styles = {
    image: {
      height: 110,
      width: 110,
      borderRadius: 4,
      background: '#ccc'
    }
  } 

export default CartItem;