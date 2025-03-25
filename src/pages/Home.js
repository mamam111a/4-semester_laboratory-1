import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]); // Храним список товаров в состоянии

  // Функция загрузки данных
  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.get("http://localhost:5000/Customers");
        setData(response.data); // Обновляем состояние
        console.log("Данные загружены:", response.data);
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
    }

    loadData();
  }, []); // Вызываем один раз при монтировании

  // Функция удаления товара
  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/Customers/${id}`);
      console.log(`Посетитель ${id} удален`);
      
      // Обновляем состояние, удаляя товар из списка
      setData((prevData) => prevData.filter(item => item.id !== id));
    } catch (error) {
      console.error("Ошибка удаления:", error);
    }
  };

  return (
    <div>
      <h1>Список посетителей</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <Link to={`/detail/${item.id}`}>{item.name}</Link>
            <button onClick={() => deleteItem(item.id)} style={{ marginLeft: "10px" }}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
      <Link to="/add">Добавить посетителя</Link>
    </div>
  );
};

export default Home;
