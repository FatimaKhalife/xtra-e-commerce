
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import "./Cart.css";


type CartItem = {
    id: number;
    product_id: number;
    qty: number;
    name: string;
    sku: string;
    image: string;
    price: number;
};

interface props {
    items: CartItem[];
    onIncrease: (id: number) => void;
    onDecrease: (is: number) => void;
    onRemove: (id: number) => void;
}

export default function Carttable({ items, onIncrease, onDecrease, onRemove }: props) {
   
 

    return (
        <>
           

            <div>
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} >
                                <td>
                                    <button onClick={() => onRemove(item.product_id)} style={{ color: "rgb(236, 27, 27)", border: "none", background: "none"}}><MdDelete style={{width:"40px", height:"20px"  }}/></button>
                                </td>
                                <td><img src={item.image} alt="" /></td>

                                <td className="product-cell">

                                    <div>
                                        {item.name}
                                        <p style={{ fontSize: "0.8rem", color: "grey" }}>SKU {item.sku}</p>

                                    </div>
                                </td>

                                <td>
                                    {item.price}
                                </td>

                                <td>
                                    <div className="prod-quantity">
                                        <button onClick={() => onDecrease(item.product_id)} className="btn-quantity1">
                                            <FaMinus />
                                        </button>

                                        <span className="btn-cart-qty">{item.qty}</span>
                                        <button onClick={() => onIncrease(item.product_id)} className="btn-quantity2">
                                            <FaPlus />
                                        </button>
                                    </div>
                                </td>

                                <td >
                                    ${item.price * item.qty}



                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </>
    );
}