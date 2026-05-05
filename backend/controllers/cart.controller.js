import { dbPool } from "../config/db.js";

// export const GetCartItems = async (req, res) => {
//     console.log("USER ID FROM TOKEN:", req.userId);

//     const userId = req.userId;
//     console.log("USER ID FROM TOKEN:", userId);
//     const [rows] = await dbPool.query(`
//     SELECT 
//       cart_items.id,
//       cart_items.product_id,
//       cart_items.qty,
//       products.name,
//       Tags_json,
//       products.sku,
//       products.image,
//       products.price
//     FROM cart_items
//     JOIN carts ON cart_items.cart_id = carts.id
//     JOIN products ON cart_items.product_id = products.id
//     WHERE carts.user_id = ?
//   `, [userId]);

//     res.json(rows);
//     console.log("Fetched cart items:", rows);

// }

export const GetCartItems = async (req, res) => {
    console.log("USER ID FROM TOKEN:", req.userId);

    const userId = req.userId;
    console.log("USER ID FROM TOKEN:", userId);
    const [rows] = await dbPool.query(`
    SELECT 
      cart_items.id,
      cart_items.product_id,
      cart_items.qty,
      products.name,
      Tags_json,
      products.sku,
      products.image,
      products.price
    FROM cart_items
    JOIN carts ON cart_items.cart_id = carts.id
    JOIN products ON cart_items.product_id = products.id
    WHERE carts.user_id = ?
  `, [userId]);

    const items = rows.map(item => ({
        ...item,
        Tags_json: JSON.parse(item.Tags_json || '[]')
    }));

    res.json(items);
    console.log("Fetched cart items:", rows);
}

export const AddToCart = async (req, res) => {
    const userId=req.userId;
    const {productId, qty } = req.body;

    let [cartRows]= await dbPool.query("Select * from carts where user_id=?",[userId]);
    
    if(cartRows.length===0){
        await dbPool.query("INSERT INTO carts (user_id) VALUES (?)", [userId]);
        [cartRows] = await dbPool.query("SELECT * FROM carts WHERE user_id=?", [userId]); 
    }

    const cartId=cartRows[0].id;

    const [existing] = await dbPool.query(
        `SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?`,
        [cartId, productId]
    );

    if (existing.length > 0) {
        await dbPool.query(`update cart_items SET qty = qty + ? WHERE cart_id = ? AND product_id = ?`, [qty, cartId, productId]);

    } else {
        await dbPool.query(`INSERT INTO cart_items (cart_id, product_id, qty) VALUES (?, ?, ?)`,
            [cartId, productId, qty]
        );

    }
    res.json({ success: true, message: "Added to cart" });
}

export const IncreaseQty = async (req, res) => {
    const userId = req.userId;
    const { productId } = req.body;

    await dbPool.query(
        `UPDATE cart_items ci
         JOIN carts c ON ci.cart_id = c.id
         SET ci.qty = ci.qty + 1
         WHERE ci.product_id = ? AND c.user_id = ?
`,
        [productId, userId]
    );

    res.json({ message: "Quantity increased" });
};
export const DecreaseQty = async (req, res) => {
    const userId = req.userId;
    const { productId } = req.body;

    await dbPool.query(
        `update cart_items ci 
        JOIN carts c on ci.cart_id=c.id
        SET ci.qty = GREATEST (ci.qty -1,1) where ci.product_id=? AND c.user_id `, [productId, userId]
    );

    res.json({ message: "Quantity Decreased" });
};

export const DeleteItem = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.body;

  const [result] = await dbPool.query(
    `
    DELETE ci
    FROM cart_items ci
    JOIN carts c ON ci.cart_id = c.id
    WHERE c.user_id = ? AND ci.product_id = ?
    `,
    [userId, productId]
  );

  console.log("DELETE affected rows:", result.affectedRows);

  res.json({ message: "Item removed", affected: result.affectedRows });
};


