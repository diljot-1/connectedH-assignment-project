import React,{useState, useEffect} from 'react'
import Pagination from './Pagination'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import Cart from './Cart'

let ItemsFromStoredCart=[];
let lengthOfCart=0;
if(JSON.parse(localStorage.getItem('cart'))!=null)
  {
       ItemsFromStoredCart=JSON.parse(localStorage.getItem('cart'));
       lengthOfCart=ItemsFromStoredCart.length;
  } 

export default function Products(props) {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(2);
  const [cart, setCart]=useState(ItemsFromStoredCart)
  const [cartLength, setCartLength] = useState(lengthOfCart);
  const [quantityPerProduct, setQuantityPerProduct] = useState([])
  const [showCart, setShowCart] = useState(false);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProductList = items.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  
  useEffect(() => {
    axios.get('http://localhost:5000/getProducts').then(function (response) {
         setItems(response.data)
         const arr=[];
         for(let i=0; i<items.length; i++)
           arr.push(0);
         setQuantityPerProduct(arr);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);

  

  function handleClick(product, index){
     cart.push(product)
     setCart(cart);
     setCartLength(cartLength+1);
     const actualIndex=index+(productsPerPage*(currentPage-1));
     quantityPerProduct[actualIndex] = quantityPerProduct[actualIndex]+1;
     setQuantityPerProduct(quantityPerProduct);
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
 },[cartLength])

 function handleCartButtonClick(){
       setShowCart(true);
  }
    return (
        <>   {!showCart && <>
               <Card style={{backgroundColor:'cyan', width:'200px', height:'75px',marginLeft:'50%',fontSize:'20px', marginBottom :"30px", textAlign: 'center'}}>
                 <div style={{marginTop:'15px'}}>Items in cart : {cartLength}</div>
                 <Button onClick={handleCartButtonClick} style={{backgroundColor:'purple'}}>Go to Cart</Button>
            </Card>
            <span style={{fontSize:'50px', marginTop:"-40px", fontWeight:'bold' , color:'blue'}}>Product List</span>
             <ul className='list-group mb-4'>
              {currentProductList.map((currentProduct, index) => (
               <li key={index} className='list-group-item'>
                <img style={{width:'130px', marginRight:'300px'}} src={currentProduct.imageUrl} alt={currentProduct.name}/>
                <span style={{fontSize:'20px', marginright:'200px'}}>{currentProduct.name}</span>
                <span style={{fontSize:'20px' ,position: 'absolute',right:'280px', top:'35%'}}>Price:  ${currentProduct.price} only</span>
                 <Button onClick={()=>handleClick(currentProduct, index) } style={{height: '30px', width:'60px', fontSize:'10px', textAlign:'center', margin:'30px', position: 'absolute',right:'20px', top:'25%'}}>Add </Button>
                 <h6>ProductID:{currentProduct.oid}</h6>
               </li>
               ))}
             </ul>
             <div style={{marginLeft:'30px'}} >
                 <Pagination productsPerPage={productsPerPage} totalProducts={items.length} paginate={paginate} />
             </div></>}
             {showCart && <Cart selectedProducts={quantityPerProduct} items={items}/>}
        </>
    )
}
