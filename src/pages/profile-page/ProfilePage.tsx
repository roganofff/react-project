import React, { useEffect, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { getToken } from "../../services/token";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setUser } from "../../store/store";
import { UserDataAPI } from "../../const";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  
  const [error, setError] = useState("");

  useEffect(() => {
    const userToken = getToken();

    if (!userToken) {
      navigate("/login");
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await fetch(UserDataAPI, {
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
      }
    };

    fetchUserInfo();
  }, [dispatch, navigate]);

  // Если произошла ошибка, показываем сообщение
  if (error) {
    return <Text size="l" view="critical">Ошибка: {error}</Text>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between", width: "60vw" }}>
      <div>
        <Text size="xl" weight="bold" style={{ color: '#0078D2' }}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text view="secondary" style={{ color: '#0078D2' }}>{user?.email}</Text>
        <Text view="secondary" style={{ color: '#0078D2', marginTop: "8px" }}>
          Логин: {user?.username}
        </Text>
        <Text view="secondary" style={{ color: '#0078D2' }}>Телефон: {user?.phone}</Text>
        <Text view="secondary" style={{ color: '#0078D2' }}>Возраст: {user?.age}</Text>
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