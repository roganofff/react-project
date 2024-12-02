import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { getToken } from '../../services/token';
import { Service } from '../../store/store';

const ServiceDetailPage = () => {
  const [service, setService] = useState<Service | null>(null);
  const { id } = useParams();
  const [serviceId, setServiceId] = useState(id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = getToken();

    if (!userToken) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setError('');

    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(`https://673423afa042ab85d1190055.mockapi.io/api/v1/services/${serviceId}`);
        if (!response.ok) {
          throw new Error('Не удалось загрузить услугу');
        }

        const serviceData = await response.json();
        setService(serviceData);
      } catch (err) {
        setError((err as Error).message || 'Произошла ошибка при загрузке услуги');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();

  }, [serviceId, navigate]);

  const handleNextService = () => {
    setServiceId((prevId) => {
      const nextId = parseInt(prevId || "0", 10) + 1;
      return nextId.toString();
    });
  };

  if (loading) {
    return <Text size="l">Загрузка...</Text>;
  }

  if (error) {
    return <Text size="l" view="critical">Ошибка: {error}</Text>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
      <Text style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{service?.name}</Text>

      {/* Генерация случайного изображения для сервиса, используя его ID */}
      <img
        src={`https://picsum.photos/500?random=${service?.id}`} // Используем ID сервиса для генерации уникального изображения
        alt={service?.name}
        style={{ width: "500px", borderRadius: "15px", objectFit: "cover" }}
      />
      
      <Text style={{ textAlign: 'center', maxWidth: '600px' }}>{service?.description}</Text>
      <Button onClick={handleNextService} label="Следующая услуга" />
    </div>
  );
};

export default ServiceDetailPage;