import FormProduct from '@components/FormProduct';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';

export default function Edit() {
  const [found, setFound] = useState(true);
  const [product, setProduct] = useState({});
  const router = useRouter();
  const [, setOpen] = useState(false);
  const { alert, setAlert, toggleAlert } = useAlert();

  useEffect(() => {
    const { id } = router.query;
    if (!router.isReady) return;

    async function getProduct() {
      try {
        const response = await axios.get(endPoints.products.getProduct(id));
        if (response) {
          setProduct(response.data);
          setFound(true);
        }
      } catch (error) {
        setFound(false);
        setAlert({
          active: true,
          message: 'Product not found.',
          type: 'error',
          autoClose: false,
        });
      }
    }
    getProduct();
  }, [router?.isReady]);

  return (
    <>
      {<Alert alert={alert} handleClose={toggleAlert} />}
      {found && <FormProduct product={product} setOpen={setOpen} setAlert={setAlert} />}
    </>
  );
}
