import '../../index.css'
import './home.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { FaStar} from 'react-icons/fa'
import {Link} from 'react-router-dom'

type Review = {
        id: string;
        text: string;
        rating: number;
        createdAt: string;
}

type Product = {
    id: string;
    name: string;
    image: string;
    description: string;
    reviews: Review[];
}

export function Home() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect( () =>{
        axios.get<Product[]>('http://localhost:8055/products')
         .then((response) => {
             setProducts(response.data);
        });
    },[]);
    
    
    return (
    <>

     <h1 className='home-title'>Shop</h1>

     <div className="products-grid">
      {products.map((product) => (
        <Link key={product.id} to={`/product_details/${product.id}`} className='product-container'> 
            <div className='product-image-container'>
                <img className='product-image' src={product.image} alt={product.name}/>
            </div>
            <div className='product-name'>
                {product.name}
            </div>
            <div className='product-description'>
                <p>{product.description}</p>
            </div>

            <div className='product-reviews'>
                <h4>Reviews:</h4>
                {product.reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                ):(
                    product.reviews.map((review) => (
                        <div key={review.id} className='product-reviews'>
                            <p>{review.text}</p>
                            <div className='review-stars'>
                                {[...Array(review.rating)].map((_,i) =>(
                                    <FaStar key={i} />
                                ))}

                            </div>
                        </div>
                    ))
                )}
            </div>
        </Link>
        ))}
        
        </div>
    </>
  );
}
