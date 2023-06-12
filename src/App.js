import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';



import { collection, getDocs,addDoc, doc,onSnapshot,updateDoc, deleteDoc } from "firebase/firestore";

class App extends React.Component {
  

  

  constructor() {
    super();
    this.state = {
      // products: [
      //   {
      //     price: 999,
      //     title: 'Watch',
      //     qty: 1,
      //     img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
      //     id: 1
      //   },
      //   {
      //     price: 9999,
      //     title: 'MobilePhone',
      //     qty: 1,
      //     img: 'https://images.unsplash.com/photo-1598327106026-d9521da673d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      //     id: 2
      //   },
      //   {
      //     price: 99999,
      //     title: 'Laptop',
      //     qty: 1,
      //     img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
      //     id: 3
      //   }
      // ],
      products: [],
      loading: true
  
    }
    // this.increaseQuantity = this.increaseQuantity.bind(this);

  }


 async componentDidMount() {
   const {db} = this.props;
  
    // const querySnapshot = await getDocs(collection(db, "products"));
    
    // querySnapshot.forEach((doc) =>   {
    //   // doc.data() is never undefined for query doc snapshots
      
    //   console.log(doc.id, " => ", doc.data());
     
    // });
  
    // const products = querySnapshot.docs.map((doc) => { 

    //   return { ...doc.data(), id: doc.id }
    // } );
    // this.setState({
    //    products: products,
    //    loading: false
    //   });

    // onSnapshot 
    onSnapshot(collection(db, "products"), (querySnapshot) => {
      const products = querySnapshot.docs.map((doc) => { 
        

        return { ...doc.data(), id: doc.id }
      } );
      this.setState({
         products: products,
         loading: false
        });
    } );


  }

  handleIncreaseQuantity = (product) => {
    const {db} = this.props;
    console.log('Hey please inc the qty of', product);
    const { products } = this.state;
    const index = products.indexOf(product);
    // products[index].qty += 1;

    // this.setState({
    //   products
    // })
    const docRef = doc(db, 'products', products[index].id);
    updateDoc(docRef, {
      qty: products[index].qty + 1
    }).then(() => {
      console.log('Updated successfully');
    }
    ).catch((error) => {
      console.log('Error', error);
    });
  }

  handleDecreaseQuantity = (product) => {
    console.log('Hey please dec the qty of', product);
    const { products } = this.state;
    const {db} = this.props;
    const index = products.indexOf(product);
    if (products[index].qty === 0) return;

    // products[index].qty -= 1;

    // this.setState({
    //   products
    // })
    const docRef = doc(db, 'products', products[index].id);
    updateDoc(docRef, {
      qty: products[index].qty - 1
    }).then(() => {
      console.log('Updated successfully');
    }
    ).catch((error) => {
      console.log('Error', error);
    });
  }

  handleDeleteproduct = (id) => {
    const { products } = this.state;

    // const items = products.filter((item) => item.id !== id);

    // this.setState({
    //   products: items,
    //   loading: false
    // })
    const {db} = this.props;
    const docRef = doc(db, 'products', id);
    deleteDoc(docRef).then(() => {
      console.log('Deleted successfully');
    } ).catch((error) => {
      console.log('Error', error);
    } );

  }

  getCartCount = () => {
    const { products } = this.state;
    let count = 0;
    products.forEach((products) => {
      count += products.qty;
    });
    return count;
  }

  getCarTotal = () => {
    const { products } = this.state;
    let cartTotal = 0;

    products.map((product) => {
      if(product.qty>0){
      cartTotal = cartTotal + product.qty * product.price;
      }
      return '';
    });

    return cartTotal;
  }
  // addProduct = () => {
  //  
  //   db.collection('products').add({
  //     img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
  //     price: 900,
  //     qty: 3,
  //     title: 'Washing Machine'
  //   }).then((docRef) => {
  //     console.log('Product has been added', docRef);
  //   }).catch((error) => {
  //     console.log('Error', error);
  //   })
  // }
  addProduct = async () => {
    try {
      const {db} = this.props;
      const docRef = await addDoc(collection(db, 'products'), {
        img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
        price: 900,
        qty: 3,
        title: 'watch'
      });
      console.log('Product has been added', docRef);
    } catch (error) {
      console.log('Error', error);
    }
  };


  render() {

    const { products, loading } = this.state;
    return (
      <div className="App">

        <Navbar count={this.getCartCount()} />
        {/* <button onClick={this.addProduct} style={{padding: 20, forntSize: 20}}> Add a product </button> */}

        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDelete={this.handleDeleteproduct}
        />
        {loading && <h1> loading products..</h1>}

        <div style={{ fontSize: 20, padding: 10 }}>
          TOTAL: {this.getCarTotal()}
        </div>
      </div>
    );
  }
}

export default App;
