import React,{useState, useEffect} from 'react'

const quantityPerProduct=[];
export default function Cart(props) {
     const [list, setList]=useState(false);    
    for(let i=0; i<props.selectedProducts.length; i++){
        if(props.selectedProducts[i]!='0')
          quantityPerProduct.push({
              'detail':props.items[i],
              'quantity':+props.selectedProducts[i]

          })
    }
    useEffect(() => {
        setList(true);
    }, [])
    
       

    return (
        <>
            <div style={{position: 'absolute', left: '50%', top: '3em',marginBottom:'20px', color: 'red'}}><h1 >My Cart</h1></div>
           <div style={{position: 'absolute', left: '2em', top: '10em',marginBottom:'20px'}}>
             <ul className='list-group mb-4'>
              {quantityPerProduct.map((currentProduct, index) => (
               <li key={index} className='list-group-item'>
                 <img style={{width:'130px', marginRight:'300px'}} src={currentProduct.detail.imageUrl} alt={currentProduct.detail.name}/>
                 <span style={{fontSize:'15px', marginRight:'200px'}}>PId: {currentProduct.detail.oid}</span>
                <span style={{fontSize:'20px', marginRight:'300px'}}>{currentProduct.detail.name}</span>
                <span style={{fontSize:'20px' ,position: 'absolute',right:'80px', top:'40%'}}>Price:  ${currentProduct.detail.price} </span>
               
               </li>
               ))}
             </ul>
             </div>
        </>
    )
}
