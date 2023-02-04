import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
  title: Yup.string().max(40).required('Title required'),
  price: Yup.number().typeError('Price required').min(1).required('Price required'),
  description: Yup.string().max(1000).required('Description required'),
  categoryId: Yup.number().required('Category required'),
  images: Yup.array().of(Yup.string()),
});

export default ValidationSchema;
