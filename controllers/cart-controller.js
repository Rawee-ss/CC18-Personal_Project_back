const prisma = require("../config/prisma");
const createError = require("../utils/createError");

exports.addItemCart = async (req, res, next) => {
  try {
    const { productsId } = req.params;
    const { id } = req.user;

    console.log(productsId);
    console.log(id);

    let userCart = await prisma.cart.findFirst({
      where: { userId: Number(id) },
    });

    if (!userCart) {
      userCart = await prisma.cart.create({
        data: {
          cartTotal: 0.0,
          userId: id,
        },
      });
    }

    const existinStore = await prisma.store.findFirst({
      where: {
        userId: id,
        productsId: +productsId,
      },
    });

    if (existinStore) {
      return createError(
        400,
        "Product already in store. Only one item can be added."
      );
    }

    const existinCartItem = await prisma.cartItem.findFirst({
      where: {
        cart: { userId: id },
        productsId: +productsId,
      },
    });

    if (existinCartItem) {
      return createError(
        400,
        "Product already in cart. Only one item can be added."
      );
    }

    const existinOrder = await prisma.orderItem.findFirst({
      where: {
        orders: { userId: id },
        productsId: +productsId,
      },
    });
    if (existinOrder) {
      return createError(
        400,
        "Product already in order. Only one item can be added."
      );
    }

    const findProduct = await prisma.products.findFirst({
      where: {
        id: +productsId,
      },
    });
    if (!findProduct) {
      return createError(400, "Not Product");
    }

    // let products = cart.map((item) => ({
    //   productsId: item.id,
    //   price: item.price,
    //   cartId: userCart.id,
    // }));

    // let cartTotal = products.reduce((sum, item) => sum + item.price, 0);

    const newCart = await prisma.cartItem.create({
      data: {
        productsId: +productsId,
        price: findProduct.price,
        cartId: userCart.id,
      },
    });
    console.log(newCart);
    // await prisma.cart.create({
    //   data: {
    //     cartTotal: cartTotal,
    //     userId: id,
    //   },
    // });

    res.json("Add Cart success");
  } catch (err) {
    next(err);
  }
};

exports.getItemCart = async (req, res, next) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        userId: Number(req.user.id),
      },
      include: {
        cartItem: {
          include: {
            products: true,
          },
        },
      },
    });
    // console.log(cart)
    res.json({
      cartId: cart.id,
      cartItem: cart.cartItem,
      cartTotal: cart.cartTotal,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteItemCart = async (req, res, next) => {
  try {
    // const { cartItemId } = req.body;
    const { cartItemId } = req.params;

    console.log("cartItemId", cartItemId);
    if (!cartItemId) {
      return res.status(400).json({ message: "cartItemId is required" });
    }

    const cart = await prisma.cart.findFirst({
      where: { userId: Number(req.user.id) },
    });
    if (!cart) {
      return res.json(400, "No cart");
    }
    await prisma.cartItem.findUnique({
      where: { id: Number(cartItemId) },
    });
    await prisma.cartItem.delete({
      where: { id: Number(cartItemId) },
    });

    res.json("Cart remove item Success");
  } catch (err) {
    next(err);
  }
};
