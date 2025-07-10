import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./OrderForm.css";

const OrderForm = () => {
  const history = useHistory();

  const [form, setForm] = useState({
    name: "",
    size: "",
    dough: "",
    toppings: [],
    note: "",
  });

  const [errors, setErrors] = useState({});

  const [quantity, setQuantity] = useState(1);
  const basePrice = 175.50;
  const extraPrice = form.toppings.length * 5;
  const totalPrice = (basePrice + extraPrice) * quantity;

  const toppingOptions = [
    "Pepperoni", "Sosis", "Kanada Jambonu", "Tavuk Izgara",
    "Soğan", "Domates", "Mısır", "Jalapeno",
    "Sarımsak", "Biber", "Ananas", "Kabak"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      let newToppings = [...form.toppings];
      if (checked) {
        newToppings.push(value);
      } else {
        newToppings = newToppings.filter((t) => t !== value);
      }
      setForm({ ...form, toppings: newToppings });
    } else {
      setForm({ ...form, [name]: value });

      if (name === "name" && value.length < 3) {
        setErrors({ ...errors, name: "En az 3 karakter olmalı" });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.name.length < 3 || !form.size || !form.dough) {
      alert("Lütfen gerekli alanları doldurun.");
      return;
    }

    const payload = {
      isim: form.name,
      boyut: form.size,
      hamur: form.dough,
      malzemeler: form.toppings,
      not: form.note,
      adet: quantity, // ✅ ADIM 3
      toplamTutar: totalPrice.toFixed(2)
    };

    try {
      const response = await axios.post(
        "https://reqres.in/api/pizza",
        payload,
        { headers: { "x-api-key": "reqres-free-v1" } }
      );
      console.log("Sipariş Yanıtı:", response.data);
      history.push("/success");
    } catch (err) {
      console.error("Hata:", err);
      alert("Sipariş gönderilemedi.");
    }
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h2>Pizza Siparişi</h2>

      <label>
        İsim: <span>*</span>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </label>

      <label>
        Boyut Seç: <span>*</span>
        <select name="size" value={form.size} onChange={handleChange}>
          <option value="">-- Seçiniz --</option>
          <option value="Küçük">Küçük</option>
          <option value="Orta">Orta</option>
          <option value="Büyük">Büyük</option>
        </select>
      </label>

      <label>
        Hamur Seç: <span>*</span>
        <select name="dough" value={form.dough} onChange={handleChange}>
          <option value="">-- Seçiniz --</option>
          <option value="İnce">İnce</option>
          <option value="Normal">Normal</option>
          <option value="Kalın">Kalın</option>
        </select>
      </label>

      <fieldset>
        <legend>Ek Malzemeler (Max 10):</legend>
        {toppingOptions.map((item, i) => (
          <label key={i}>
            <input
              type="checkbox"
              name="toppings"
              value={item}
              onChange={handleChange}
              checked={form.toppings.includes(item)}
              disabled={
                !form.toppings.includes(item) && form.toppings.length >= 10
              }
            />
            {item}
          </label>
        ))}
      </fieldset>

      <label>
        Sipariş Notu:
        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="Eklemek istediğin bir şey var mı?"
        />
      </label>

      {/* ✅ ADIM 2 – Fiyat kutusu */}
      <div className="order-summary">
        <div className="quantity-control">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >-</button>
          <span>{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
          >+</button>
        </div>

        <div className="price-box">
          <p>Seçimler: {extraPrice.toFixed(2)}₺</p>
          <h3>Toplam: {totalPrice.toFixed(2)}₺</h3>
        </div>
      </div>

      <button type="submit">SİPARİŞ VER</button>
    </form>
  );
};

export default OrderForm;
