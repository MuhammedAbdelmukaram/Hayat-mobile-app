import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Priority2 from './Priority2';
import Priority3 from './Priority3';
import Priority4 from './Priority4';
import Priority5 from './Priority5';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {API_URL} from '@env';

// Hypothetical Advertisement component
const PriorityAd = ({}) => (
    <View style={{ alignItems: 'center', marginVertical: 20 }}>
        {/* Placeholder for an advertisement */}
        <Text>Ad Placeholder</Text>
    </View>
);

const CategoryHighlightNews = () => {
    const mainArticles = useSelector(state => state.selectedContent.mainArticles);
    const categoriesData = useSelector(state => state.selectedContent.categoriesData);

    useEffect(() => {
        axios.get(`${API_URL}/articles/main`)
            .then(response => {
                console.log("hihi"+response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const getCategoryName = (categoryId) => {
        const category = categoriesData?.find(c => c._id === categoryId);
        return category ? category.name : 'Unknown Category';
    };

    // Original rendering algorithm
    const renderArticlesAlgo1 = (articles) => renderArticlesGeneric(articles, 1);

    // Second rendering algorithm with variations
    const renderArticlesAlgo2 = (articles) => renderArticlesGeneric(articles, 2);

    // Third rendering algorithm with further variations
    const renderArticlesAlgo3 = (articles) => renderArticlesGeneric(articles, 3);

    // Unified rendering function with an algorithm indicator for customization
    const renderArticlesGeneric = (articles, algoNumber) => {
        const selectedArticles = articles.slice(0, 7);

        return selectedArticles.map((article, index) => {
            let PriorityComponent;

            if (algoNumber === 1) {
                // Original logic
                PriorityComponent = [Priority2, Priority3, Priority3, Priority5, Priority5, Priority5, Priority3][index];
            } else if (algoNumber === 2) {
                // Insert an ad for the second algorithm at the second position
                if (index === 1) return <PriorityAd key="ad" />;
                PriorityComponent = [Priority2, Priority4, Priority4, Priority3, Priority3, Priority5, Priority5][index];
            } else {
                // Use a different mix for the third algorithm
                PriorityComponent = [Priority2, Priority5, Priority4, Priority4, Priority3, Priority3, Priority5][index];
            }

            return PriorityComponent ? React.createElement(PriorityComponent, {
                key: article._id,
                image: { uri: article.image_list[0]?.url },
                articleTitle: article.title,
                articleSubtitle: article.subtitle,
                articleID: article._id,
            }) : null;
        }).filter(component => component != null);
    };

    // Select and apply rendering logic in a round-robin fashion
    const applyRenderingLogic = (articles, categoryIndex) => {
        const algoIndex = categoryIndex % 3;
        switch (algoIndex) {
            case 0: return renderArticlesAlgo1(articles);
            case 1: return renderArticlesAlgo2(articles);
            case 2: return renderArticlesAlgo3(articles);
            default: return null;
        }
    };

    return (
        <View style={styles.container}>
            {mainArticles && mainArticles.map((categoryArticles, categoryIndex) => {
                if (categoryArticles.length > 0 && categoryArticles[0].category) {
                    const categoryName = getCategoryName(categoryArticles[0].category);
                    return (
                        <View key={categoryIndex} style={styles.categoryContainer}>
                            <View style={{ backgroundColor: '#fff', paddingBottom: 10 }}>
                                <View style={styles.categoryName}>
                                    <Text style={styles.category}>{categoryName}</Text>
                                </View>
                            </View>
                            {applyRenderingLogic(categoryArticles, categoryIndex)}
                        </View>
                    );
                }
                return null;
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        backgroundColor: '#e1e1e1',
    },
    categoryName: {
        backgroundColor: '#1A2F5A',
        paddingHorizontal: 20,
        paddingVertical: 4,
        alignSelf: 'flex-start',
    },
    category: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
    categoryContainer: {
        marginBottom: 20,
    },
});

export default CategoryHighlightNews;
