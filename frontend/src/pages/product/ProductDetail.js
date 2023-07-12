import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from 'api';
import { useAppContext } from 'store';
import 'react-image-gallery/styles/css/image-gallery.css';
import ProductDetail from 'components/product/ProductDetail';
import ProductReview from '../../components/product/ProductReview';


const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();

  const [reviewList, setReviewList] = useState();
  const { store: token } = useAppContext();
  const headers = { Authorization: `Bearer ${token['jwtToken']}`};
  
  useEffect(() => {
    async function fetchProduct() {
      try {
        const apiUrl = `/product/detail/${id}/`;
        const { data } = await axiosInstance.get(apiUrl);
        console.log("product_data :", data);

        const { images, options, ...productInfo } = data;
        const formattedImages = images.map((image) => ({
          original: image.image_src,
          thumbnail: image.image_src,
        }));
        const formattedColorOptions = options.map((option) => ({
          id: option.id,
          value: option.option_color,
          price: option.price,
        }));
        const formattedSizeOptions = options.map((option) => ({
          id: option.id,
          value: option.option_size,
        }));
        const formattedOptions = options.map((option) => ({
          id: option.id,
          color: option.option_color,
          size: option.option_size,
          price: option.price,
        }));


        setProduct({
          images: formattedImages,
          optionColor: formattedColorOptions,
          optionSize: formattedSizeOptions,
          option: formattedOptions,
          productInfo: productInfo,
        });
      } catch (error) {
        console.log('error : ', error);
      }
    }
    fetchProduct();

    async function fetchReviewList() {
      try{
          const apiUrl = `/review/?product_id=${id}`
          const { data } = await axiosInstance.get(apiUrl);
          console.log("review_data :", data);
          setReviewList(data);
      }catch(error){
          console.log('error : ', error);
      }
    }
    fetchReviewList();
  }, []);

  return (
    <div>
      {product && <ProductDetail productData={product} />}
      <div style={{height: "50px"}}></div>
      {reviewList && <ProductReview productId={id} />}
    </div>
  );
};

export default Product;
