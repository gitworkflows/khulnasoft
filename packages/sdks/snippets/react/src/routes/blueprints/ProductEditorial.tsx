import {
  KhulnasoftContent,
  Content,
  fetchOneEntry,
  isPreviewing,
} from '@khulnasoft.com/sdk-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductFooter from '../../components/ProductFooter';
import ProductHeader from '../../components/ProductHeader';
import ProductInfo, { type Product } from '../../components/ProductInfo';

const API_KEY = 'ee9f13b4981e489a9a1209887695ef2b';
const MODEL_NAME = 'product-editorial';

export default function ProductEditorial() {
  const [product, setProduct] = useState<Product | null>(null);
  const [editorial, setEditorial] = useState<KhulnasoftContent | null>(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((productData) => {
        setProduct(productData);
      });
  }, [id]);

  useEffect(() => {
    fetchOneEntry({
      model: MODEL_NAME,
      apiKey: API_KEY,
      userAttributes: { urlPath: window.location.pathname },
    }).then((editorialData) => {
      setEditorial(editorialData);
    });
  }, []);

  if (!isPreviewing() && !product && !editorial) return <div>404</div>;

  return (
    <>
      <ProductHeader />
      <ProductInfo product={product} />
      {/* Render Khulnasoft content below */}
      <Content model={MODEL_NAME} content={editorial} apiKey={API_KEY} />
      <ProductFooter />
    </>
  );
}
