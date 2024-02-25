import React, { useEffect } from 'react';
import { StyleSheet, View } from "react-native";
import Priority1 from "../Priority1";
import Priority2 from "../Priority2";
import Priority3 from "../Priority3";
import Priority4 from "../Priority4";
import Priority5 from "../Priority5";
import { useSelector } from "react-redux";
import image1 from "../../assets/news/newsBack-1.png"
import image2 from "../../assets/news/newsBack-2.png"
import image3 from "../../assets/news/newsBack-3.png"
import image4 from "../../assets/news/newsBack-4.png"
import image5 from "../../assets/news/newsBack-5.png"
import image6 from "../../assets/news/newsBack-6.png"
import image7 from "../../assets/news/newsBack-7.png"
import article from "../../screens/Article";

const HighlightNews = () => {
    const highlightData = useSelector((state) => state.selectedContent.highlightData);



    const renderComponent = (article) => {
        switch (article.priority) {
            case 2: return <Priority2 {...articleProps(article)} />;
            case 3: return <Priority3 {...articleProps(article)} />;
            case 4: return <Priority4 {...articleProps(article)} />;
            case 5: return <Priority5 {...articleProps(article)} />;
            case 6: return <Priority5 {...articleProps(article)} />;
            default: return null;
        }
    };

    const articleProps = (article) => ({
        article:article,
        articleID:article._id,
        articleTitle: article.title,
        image: { uri: article.image_list[0]?.url }, // Format as an object with a uri field
        articleSubtitle: article.subtitle,
    /*
        articleText: article.text,
        editor:article.editor,
        dateTime:article.date_time,
        photoPost:article.photo_post,
        published:article.published,
        urlTitle: article.url_title,
        videoPost:article.video_post,
        imageList: article.image_list,

    */
    });

    // Categorize articles by priority
    const articlesByPriority = {};
    highlightData.forEach(article => {
        if (!articlesByPriority[article.priority]) {
            articlesByPriority[article.priority] = [];
        }
        articlesByPriority[article.priority].push(article);
    });

    const sortedData = [];
    const sortOrder = [2, 5, 4, 3, 4, 3, 6];

    sortOrder.forEach(priority => {
        if (articlesByPriority[priority] && articlesByPriority[priority].length > 0) {
            // Take the next article from the corresponding category
            sortedData.push(articlesByPriority[priority].shift());
        }
    });


    return (
        <View style={styles.container}>
            {sortedData.map(article => {
                // Directly render the component with a key
                return (
                    <React.Fragment key={article._id}>
                        {renderComponent(article)}
                    </React.Fragment>
                );
            })}
        </View>
    );

};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e1e1e1'
    },
});

export default HighlightNews;
