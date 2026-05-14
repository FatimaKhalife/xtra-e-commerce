import { API_URL } from "../config";

export const AddtoCart = async (id: number, qty: number | string) => {
  try {
    const authRes = await fetch(`${API_URL}/auth/me`, { credentials: "include" });
    const authData = await authRes.json();

    if (!authData.success) {
      window.location.href = "/login";
      return;
    }
    const res = await fetch(`${API_URL}/cart/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId: id, qty: Number(qty) }),
    });
    const data = await res.json();
    if (data.success) {
      alert("Added to cart ✅");
    }
  } catch (err) {
    console.log("err fetching");
  }
};