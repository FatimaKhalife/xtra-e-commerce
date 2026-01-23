import { dbPool } from "../config/db.js";

export const Checkout = async (req, res) => {
  try {
    const userId = req.userId;
    const { billing } = req.body;


    if (!userId) {
      return res.status(401).json({ message: "User not logged in" });
    }


    const [addressResult] = await dbPool.query(
      `INSERT INTO addresses
        (user_id, first_name, last_name, phone, company, country, address1, address2, city, postcode, addintionalNote)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
      [
        userId,
        billing.firstName,
        billing.lastName,
        billing.phone,
        billing.company || null,
        billing.country,
        billing.address1,
        billing.address2 || null,
        billing.city,
        billing.postcode,
        billing.notes
      ]
    );

    const addressId = addressResult.insertId;

    const [cartItems] = await dbPool.query(
      `SELECT ci.product_id, ci.qty, p.name, p.price 
       FROM cart_items ci
       JOIN carts c ON ci.cart_id = c.id
       JOIN products p ON ci.product_id = p.id
       WHERE c.user_id = ?`,
      [userId]
    );

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }


    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping_threshold = 100;
    const shipping_fee = 50;
    const shipping = subtotal >= shipping_threshold ? 0 : shipping_fee;
    const tax = 0;
    const total = subtotal + shipping + tax;


    const [orderResult] = await dbPool.query(
      `INSERT INTO orders
        (user_id, billing_address_id, subtotal, shipping, total)
        VALUES (?, ?, ?, ?, ?)`,
      [userId, addressId, subtotal, shipping, total]
    );

    const orderId = orderResult.insertId;


    for (const item of cartItems) {
      await dbPool.query(
        `INSERT INTO order_items
          (order_id, product_id, product_name, price, qty, subtotal)
          VALUES (?, ?, ?, ?, ?, ?)`,
        [orderId, item.product_id, item.name, item.price, item.qty, item.price * item.qty]
      );
    }


    await dbPool.query(
      `DELETE ci FROM cart_items ci
       JOIN carts c ON ci.cart_id = c.id
       WHERE c.user_id = ?`,
      [userId]
    );


    res.status(201).json({
      message: "Order placed successfully",
      orderId,subtotal,shipping,total
    });

  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ message: err.message || "Something went wrong during checkout" });
  }
};
