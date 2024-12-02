import React, { useEffect, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { getToken } from "../../services/token";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setUser } from "../../store/store";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  
  const [loading, setLoading] = useState(true);  // Состояние для индикатора загрузки
  const [error, setError] = useState("");        // Состояние для ошибок

  useEffect(() => {
    const userToken = getToken();

    if (!userToken) {
      navigate("/login");
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await fetch("https://dummyjson.com/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Не удалось загрузить информацию о пользователе");
        }

        const userInfo = await response.json();
        dispatch(setUser(userInfo));
      } catch (err) {
        setError((err as Error).message || "Произошла ошибка при загрузке данных пользователя");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [dispatch, navigate]);

  // Если загрузка данных, отображаем индикатор
  if (loading) {
    return <Text size="l">Загрузка...</Text>;
  }

  // Если произошла ошибка, показываем сообщение
  if (error) {
    return <Text size="l" view="critical">Ошибка: {error}</Text>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between", width: "60vw" }}>
      <div>
        <Text size="xl" weight="bold" style={{ color: 'white' }}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text view="secondary" style={{ color: 'white' }}>{user?.email}</Text>
        <Text view="secondary" style={{ color: 'white', marginTop: "8px" }}>
          Username: {user?.username}
        </Text>
        <Text view="secondary" style={{ color: 'white' }}>Phone: {user?.phone}</Text>
        <Text view="secondary" style={{ color: 'white' }}>Age: {user?.age}</Text>
      </div>
      {user?.image && (
        <img
          src={user?.image}
          alt="User Profile"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            marginBottom: "16px",
            objectFit: "cover", // Чтобы изображение не растягивалось
          }}
        />
      )}
    </div>
  );
};

export default ProfilePage;