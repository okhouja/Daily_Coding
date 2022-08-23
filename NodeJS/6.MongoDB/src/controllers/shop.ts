import express, { RequestHandler } from "express";

const Product = require("../models/product");

export const getProducts: RequestHandler = (req, res, next) => {
  Product.fetchAll()
    .then((products: any) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Product",
        path: "/products",
      });
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

export const getIndex: RequestHandler = (req, res, next) => {
  Product.fetchAll()
    .then((products: any) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err: Error) => {
      console.log(err);
    });
};


export const getProduct: RequestHandler = (req, res, next) => {
  const prodId = req.params.productId;

  // first way
  // Product.findAll({ where: { id: prodId } })
  //   .then((products: any) => {
  //     res.render("shop/product-detail", {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: "/products",
  //     });
  //   })
  //   .catch((err: Error) => {
  //     console.log(err);
  //   });

  // second way

  Product.findById(prodId)
    .then((product: any) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err: Error) => console.log(err));
};


export const getCart: RequestHandler = (req, res, next) => {
  req.user
    .getCart()
    .then((cart: any) => {
      return cart.getProducts();
    })
    .then((products: any) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((err: Error) => console.log(err));
};

/*

modern javascript
exports.postCart = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    let qty;
    let prod;
    const cart = await req.user.getCart();
    const [product] = await cart.getProducts({where:{id: prodId}});
    if (product) {
      [qty, prod] = [product.cartItem.quantity + 1, product];
    } else {
      [qty, prod] = [1, await Product.findByPk(prodId)];
    }
    await cart.addProduct(prod, {
      through: {quantity: qty}
    });
    res.redirect('/cart');
  }
  catch(err) {
    console.log(err);
  }
};


*/
/*
export const postCart: RequestHandler = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart: any;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart: any) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products: any) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then((product: any) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })

    .catch((err: Error) => console.log(err));
};

export const postCartDeleteProduct: RequestHandler = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart: any) => {
      return cart.getProducts({ WHERE: { id: prodId } });
    })
    .then((products: any) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((result: any) => res.redirect("/cart"))
    .catch((err: Error) => console.log(err));
};

export const postOrder: RequestHandler = async (req, res, next) => {
  try {
    const userCart = await req.user.getCart();
    const userCartProducts = await userCart.getProducts();
    const userOrder = await req.user.createOrder();

    await userOrder.addProducts(
      userCartProducts.map((p: any) => {
        p.orderItem = { quantity: p.cartItem.quantity };
      })
    );

    await res.redirect("/orders");
  } catch (err) {
    console.log(err);
  }
};

export const postOrder2: RequestHandler = (req, res, next) => {
  let fetchedCart: any;
  req.user
    .getCart()
    .then((cart: any) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products: any) => {
      fetchedCart = products;
      return req.user.createOrder();
    })
    .then((order: any) => {
      return order.addProducts(
        fetchedCart.map((product: any) => {
          product.orderItem = { quantity: product.cartItem.quantity };
          console.log(product);

          console.log(fetchedCart);

          return product;
        })
      );
    })

    .then((result: any) => {
      return fetchedCart.setProducts(null);
    })
    .then((result: any) => {
      res.redirect("/orders");
    })
    .catch((err: Error) => console.log(err));
};

export const getOrders: RequestHandler = (req, res, next) => {
  req.user
    .getOrders({ include: [{ model: Product }] })
    .then((orders: any) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
      console.log(orders);
    })
    .catch((err: Error) => console.log(err));
};*/
