import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from 'api';
import 'react-image-gallery/styles/css/image-gallery.css';
import ProductDetail from 'components/product/ProductDetail';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  
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


        setProduct({
          images: formattedImages,
          optionColor: formattedColorOptions,
          optionSize: formattedSizeOptions,
          productInfo: productInfo,
        });
      } catch (error) {
        console.log('error : ', error);
      }
    }
    fetchProduct();
  }, []);

  return (
    <div>
      {product && <ProductDetail productData={product} />}
    </div>
  );
};

export default Product;
