import React from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import Priority2 from '../Priority2';
import Priority3 from '../Priority3';
import Priority5 from '../Priority5';

const NewsFeed = () => {

    const contentData = useSelector((state) => state.selectedContent.contentData);

    if (!contentData) {
        return <ActivityIndicator size="large" color="#1A2F5A" />;
    }

    // Helper to sort by date
    const sortByDate = (a, b) => new Date(b.date_time) - new Date(a.date_time);

    // Combined and sorted lists
    const combinedArticles = [
        ...contentData.video,
        ...contentData.text,
        ...contentData.photo
    ].filter(Boolean).sort(sortByDate);

    return (
        <ScrollView>
            {contentData.videoHighlight && (
                <Priority2
                    articleID={contentData.videoHighlight._id}
                    image={{ uri: contentData.videoHighlight.image_list[0]?.url }}
                    articleTitle={contentData.videoHighlight.title}
                    articleSubtitle={contentData.videoHighlight.subtitle}
                    article={contentData.videoHighlight}
                />
            )}
            {contentData.photoHighlight && (
                <Priority2
                    articleID={contentData.photoHighlight._id}
                    image={{ uri: contentData.photoHighlight.image_list[0]?.url }}
                    articleTitle={contentData.photoHighlight.title}
                    articleSubtitle={contentData.photoHighlight.subtitle}
                />
            )}
            {contentData.textHighlight && (
                <Priority3
                    articleID={contentData.textHighlight._id}
                    image={{ uri: contentData.textHighlight.image_list[0]?.url }}
                    articleTitle={contentData.textHighlight.title}
                    articleSubtitle={contentData.textHighlight.subtitle}
                />
            )}
            {combinedArticles.map((article, index) => {
                if (article.video_post) {
                    return (
                        <Priority2
                            key={article._id}
                            image={{ uri: article.image_list[0]?.url }}
                            articleID={article._id}
                            articleTitle={article.title}
                            articleSubtitle={article.subtitle}
                            article={article}
                        />
                    );
                } else if (article.photo_post) {
                    // Use Priority2 or Priority3 based on your testing
                    return (
                        <Priority3
                            key={article._id}
                            image={{ uri: article.image_list[0]?.url }}
                            articleID={article._id}
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

export default NewsFeed;
