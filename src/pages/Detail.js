import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [itemData, setItemData] = useState({ name: '', description: '' });
    const nameRef = useRef(null);
    const descriptionRef = useRef(null);

    useEffect(() => {
        async function loadItem() {
            try {
                const response = await axios.get(`http://localhost:5000/Customers/${id}`);
                setItemData(response.data);
            } catch (error) {
                console.error("Ошибка загрузки:", error);
            }
        }

        loadItem();
    }, [id]);

    useEffect(() => {
        if (nameRef.current && descriptionRef.current) {
            nameRef.current.value = itemData.name;
            descriptionRef.current.value = itemData.description;
        }
    }, [itemData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedItem = {
            name: nameRef.current.value,
            description: itemData.description,
        };

        try {
            const response = await axios.put(`http://localhost:5000/Customers/${id}`, updatedItem, {
                headers: { "Content-Type": "application/json" },
            });
            setItemData(response.data);
            console.log("Обновленный посетитель:", response.data);
            navigate('/');
        } catch (error) {
            console.error("Ошибка обновления:", error);
        }
    };

    return (
        <div>
            <h1>Редактирование товара</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Название:
                    <input type="text" ref={nameRef} required />
                </label>
                <br />
                <label>
                    Описание:
                    <textarea
                        ref={descriptionRef}
                        value={itemData.description}
                        onChange={(e) => setItemData({ ...itemData, description: e.target.value })}
                        required
                    />
                </label>
                <br />
                <button type="submit">Сохранить</button>
            </form>
        </div>
    );
};

export default Detail;
