import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    createdAt: 'Data de criação do anúncio',
    description: 'Descrição da propriedade',
    media: '/static/images/products/product_1.png',
    title: 'Nome da propriedade',
    totalDownloads: 'Nota média'
  },
];
