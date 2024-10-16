const prisma = require("../config/prisma");

exports.addItemCart = async (req, res, next) => {
  try {
    const { cart } = req.body;

    console.log(cart);
    console.log(req.user.id);

    const user = await prisma.user.findFirst({
      where: { id: Number(req.user.id) },
    });

    // console.log(user)

    const existingstore = await prisma.store.findFirst({
      where: {
        userId: user.id,
        productsId: cart[0].id,
      },
    });

    if (existingstore) {
      return res.status(400).json({
        message: "Product already in store. Only one item can be added.",
      });
    }

    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cart: { userId: user.id },
        productsId: cart[0].id,
      },
    });

    if (existingCartItem) {
      return res.json(
        400,
        "Product already in cart. Only one item can be added."
      );
    }

    // Deleted old Cart item
    // await prisma.cartItem.deleteMany({
    //   where: {
    //     cart: {
    //       userId: user.id,
    //     },
    //   },
    // });
    // // ลบสินค้าตัวเก่าที่ค้างอยู่ใน cart
    // await prisma.cart.deleteMany({
    //   where: { userId: user.id },
    // });

    // เตรียมสินค้า
    let products = cart.map((item) => ({
      productsId: item.id,
      price: item.price,
    }));

    // console.log(products);

    //  หาผลรวม
    let cartTotal = products.reduce((sum, item) => sum + item.price, 0);

    // New cart
    const newCart = await prisma.cart.create({
      data: {
        cartItem: {
          create: products,
        },
        cartTotal: cartTotal,
        userId: user.id,
      },
    });
    console.log(newCart);
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
      cartItem: cart.cartItem,
      cartTotal: cart.cartTotal,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteItemCart = async (req, res, next) => {
  try {
    const { cartItemId } = req.body;
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
      where: { id: cartItemId },
    });
    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    res.json("Cart remove Success");
  } catch (err) {
    next(err);
  }
};
