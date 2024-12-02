import React, { useEffect } from 'react';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, GridItem } from '@consta/uikit/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setServices } from '../../store/store';
import { getToken } from '../../services/token';
import { ServicesAPI } from '../../const';

const ServicePage = () => {
  const dispatch = useDispatch();
  const services = useSelector((state: RootState) => state.services);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = getToken();

    if (!userToken) {
      navigate("/login");
      return;
    }

    const fetchServices = async () => {
      try {
        const response = await fetch(ServicesAPI);
        if (!response.ok) {
          throw new Error('Ошибка при загрузке услуг');
        }
        const data = await response.json();
        dispatch(setServices(data));
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, [dispatch, navigate]);

  // Если нет доступных услуг
  if (!services || services.length === 0) {
    return <Text size="l">Нет доступных услуг</Text>;
  }

  return (
    <Grid gap="xl" cols={3}>
      {services.map((service) => (
        <GridItem key={`service/${service.id}`}>
          <Card verticalSpace="xs" horizontalSpace="xs" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {/* берем случайную фотографию для каждого сервиса */}
            <img
              src={`https://picsum.photos/200?random=${service.id}`} //картинка с использованием ID сервиса
              width="200px"
              style={{ borderRadius: "15px", objectFit: "cover" }}
              alt={service.name}
            />
            <div>
              <Text weight="bold">{service.name}</Text>
              <Text>{service.description}</Text>
              <Link to={`/service/${service.id}`}>
                <Text as="span" view="link">Подробнее</Text>
              </Link>
            </div>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
};

export default ServicePage;