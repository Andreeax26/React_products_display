import '../../index.css'
import { useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { FaStar} from 'react-icons/fa'
import "./productdetails.css"

export function ProductDetails() {

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

    const [product, setProduct] = useState<Product | null>(null);
    const { id } = useParams<{id:string}>();

     useEffect( () =>{
        async function fetchProduct(){
            try{
             const response = await axios.get<Product[]>(`http://localhost:8055/products/${id}`);
             setProduct(response.data[0] || null);
            } catch (error) {
                console.error("Failed to fetch product:",error);
            }
        }
        fetchProduct();
       },[id]);
       

    if (!product) return <p>Loading product...</p>;

    return (
    <>
        <div className='product-container-details'>
            <div className='img-descr-container'>
                <div className='product-image-container'>
                    <img className='product-image' src={product.image} alt={product.name}/>
                </div>

                <div className='right-product-details'>
                    <div className='product-name'>
                        {product.name}
                    </div>
                    <div className='product-description'>
                        <p>{product.description}</p>
                    </div>
                    <p className='title-size'>Size</p>
                    <div className='buttons-container'>
                        <button type='button' className='button-size'>XS</button>
                        <button type='button' className='button-size'>S</button>
                        <button type='button' className='button-size'>M</button>
                        <button type='button' className='button-size'>L</button>
                        <button type='button' className='button-size'>XL</button>
                    </div>
                    <button className='button-order'>Order</button>
                </div>
            </div>

            <hr className="line" />

            <div className='product-reviews-container'>
                <div className='add-review-container'>
                   <input placeholder='Add a review' className='review-input' id='review-input'/>
                    <div>
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} color="gold" size={24} />
                        ))}
                   </div>
                   <button type='submit' className='review-button'>Submit</button>
                </div>
                <p className='title-reviews'>Reviews</p>
                {product.reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                ):(
                    product.reviews.map((review) => (
                        <div key={review.id} className='product-reviews-details'>
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
        </div>
    </>
    )

}
