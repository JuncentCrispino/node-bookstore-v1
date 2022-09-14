// import mongoose from 'mongoose';
// import Product from './models/product.model.js';
// import { readFile } from 'fs/promises';
// import Chance from 'chance';
// const data = JSON.parse(
//   await readFile(
//     new URL('./books.json', import.meta.url)
//   )
// );

// async function main() {
//   mongoose.connect('').then(() => {
//     console.log('connected to mongodb');
//   });
//   const chance = new Chance();

//   const newBooks = [];
//   for (const book of data) {
//     if (book.title.length > 0 && book.authors.length > 0) {
//       let categories;
//       if (book.categories.length > 0) {
//         categories = (book.categories).toLowerCase();
//       } else {
//         categories = 'uncategorized';
//       }
//       newBooks.push({
//         title: book.title,
//         subtitle: book.subtitle,
//         authors: book.authors,
//         price: chance.integer({ min: 250, max: 5000 }),
//         promoPrice: null,
//         category: categories,
//         description: book.description,
//         thumbnail: book.thumbnail,
//         availableStock: chance.integer({ min: 1, max: 1000 }),
//         sold: chance.integer({ min: 1, max: 1000 }),
//         pageNumber: book.num_pages,
//         yearPublished: book.published_year,
//         isbn13: book.isbn13.toString(),
//         isbn10: book.isbn10
//       });
//     }
//   }

//   await Promise.all((newBooks.map(async (book) => {
//     const product = new Product(book);
//     await product.save();
//     console.log(product);
//   })));
// }

// async function main() {
//   let categories = [];
//   for(const book of data) {
//     categories.push(book.categories);
//   }
//   categories = new Set(categories);
//   categories = [...categories];
//   categories.filter(category => category !== undefined);

//   mongoose.connect('mongodb+srv://admin:EtD6uSsjEGsmknOw@cluster0.tnnw4ih.mongodb.net/BookStore?retryWrites=true&w=majority').then(() => {
//     console.log('connected to mongodb');
//   }).then(async () => {
//     const categorySchema = new mongoose.Schema({
//       name: String
//     });

//     const Category = mongoose.model('Category', categorySchema);
//     try {
//       await Promise.all((categories.map(async (category) => {
//         const product = new Category({
//           name: category.toLowerCase()
//         });
//         await product.save();
//       })));
//     } catch (error) {
//       console.log(error);
//     } finally {
//       process.exit();
//     }
//   });

// }

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

import MongoClient from 'mongodb';

const agg = [
  {
    '$search': {
      'index': 'bookIndex',
      'text': {
        'query': 'harry potter',
        'path': 'title'
      }
    }
  }
];

async function main() {
  const client = new MongoClient.MongoClient(process.env.MONGO_URI);
  await client.connect();
  const db = client.db('BookStore');
  const collection = db.collection('products');
  const result = await collection.aggregate([
    {
      '$search': {
        'index': 'bookIndex',
        'text': {
          'query': 'harry potter',
          'path': 'title'
        }
      }
    },
    {
      $facet: [
        {
          $sort: 
        }
      ]
    }
  ]).toArray();
  console.log(result);
  client.close();
}

await main();