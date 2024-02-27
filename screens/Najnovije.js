import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setNajnovijeData, setLoading } from '../redux/slices/selectedContentSlice';
import Priority2 from '../components/Priority2';
import Priority3 from '../components/Priority3';
import Priority5 from '../components/Priority5';
import { API_URL } from '@env';

const Najnovije = () => {
    const dispatch = useDispatch();
    const najnovijeData = useSelector((state) => state.selectedContent.najnovijeData);
    const loading = useSelector((state) => state.selectedContent.loading);

    useEffect(() => {
        dispatch(setLoading(true)); // Set loading to true before fetching data
        axios.get((`https://backproba.hayat.ba/articles/mob/najnovije`))
            .then(response => {
                console.log('Fetched data with axios:', response.data);
                dispatch(setNajnovijeData(response.data)); // Dispatch the action to set najnovije data
            })
            .catch(error => {
                console.error('Fetching articles failed', error);
            })
            .finally(() => {
                dispatch(setLoading(false)); // Set loading to false after fetching
            });
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#1A2F5A" />;
    }

    return (
        <ScrollView>
            {najnovijeData.map((article, index) => {
                if (article.video_post) {
                    return (
                        <Priority2
                            key={article._id}
                            articleID={article._id}
                            image={{ uri: article.image_list[0]?.url }}
                            articleTitle={article.title}
                            articleSubtitle={article.subtitle}
                            article={article}

                        />
                    );
                } else if (article.photo_post) {
                    return (
                        <Priority3
                            key={article._id}
                            articleID={article._id}
                            image={{ uri: article.image_list[0]?.url }}
                            articleTitle={article.title}
                            articleSubtitle={article.subtitle}
                            article={article}
                        />
                    );
                } else if (article.text_post) {
                    return (
                        <Priority5
                            key={article._id}
                            articleID={article._id}
                            image={{ uri: article.image_list[0]?.url }}
                            articleTitle={article.title}
                        />
                    );
                }
            })}
        </ScrollView>
    );
};

export default Najnovije;
