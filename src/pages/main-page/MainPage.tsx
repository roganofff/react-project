import React, { useEffect } from "react";
import { Card } from "@consta/uikit/Card";
import { Text } from "@consta/uikit/Text";
import { Grid } from "@consta/uikit/Grid";
import { useDispatch, useSelector } from "react-redux";
import { setNews, RootState } from "../../store/store";
import { MainNewsAPI } from "../../const";

const MainPage = () => {
    const dispatch = useDispatch();
    const mainNews = useSelector((state: RootState) => state.mainNews);

    // Загрузка новостей при монтировании компонента
    useEffect(() => {
    const fetchNews = async () => {
        try {
        const response = await fetch(MainNewsAPI);
        const data = await response.json();
        dispatch(setNews(data));
        } catch (error) {
        console.error('Error fetching news:', error);
        }
    };

    fetchNews();
    }, [dispatch]);

    return (
    <Grid cols={1} gap="xl" style={{ gap: "2rem" }}>
        {mainNews.map((publication) => (
        <Card
            key={publication.id}
            verticalSpace="l"
            horizontalSpace="l"
            shadow
            style={{
            paddingBottom: "1rem",
            backgroundColor: "#fff",
            borderRadius: "8px",
            border: "1px solid #ddd",
            position: "relative",
            }}
        >
            {/* Заголовок новости */}
            <Text
            weight="bold"
            size="l"
            style={{ marginBottom: "10px", color: "#333" }}
            >
            {publication.name}
            </Text>

            {/* Описание новости */}
            <Text
            size="m"
            style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 4,
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: 'black',
            }}
            >
            {publication.description}
            </Text>

            {/* Дата создания новости */}
            <Text
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "1rem",
                fontSize: "0.875rem",
                color: "#888",
            }}
            >
            {new Date(publication.createdAt).toLocaleDateString()}
            </Text>
        </Card>
        ))}
    </Grid>
    );
};

export default MainPage;