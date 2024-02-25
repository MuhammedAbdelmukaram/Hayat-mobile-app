import React, {useCallback, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    Modal,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import image from "../assets/news/newsBack-2.png";
import {useNavigation} from "@react-navigation/native";
import Header from "../components/Common/Header";
import ShareButtons from "../components/Articles/ShareButtons";
import SuggestedNews from "../components/Articles/SuggestedNews";
import axios from "axios";
import WebView from "react-native-webview";
import {Video} from "expo-av";
import {useDispatch, useSelector} from "react-redux";
import {API_URL} from '@env';


import Survey from "./Survey";
import {BlurView} from "expo-blur";
import ArticleHeader from "../components/Articles/ArticleHeader";


const screenWidth = Dimensions.get('window').width;

const Article = ({ route }) => {


    const navigation = useNavigation();
    const { articleID } = route.params;
    const [article, setArticle] = useState(null);
    const [contentHeight, setContentHeight] = useState(300); // Default height
    const [visibleItem, setVisibleItem] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleVideoUrl, setVisibleVideoUrl] = useState(null);

    const isVideo = (url) => {
        return /\.(mp4|mov)$/i.test(url);
    };


        useEffect(() => {
            const fetchArticle = async () => {
                try {
                    console.log({articleID});
                    const response = await axios.get(`${API_URL}/article/${articleID}`);
                    const sortedMedia = response.data.image_list.sort((a, b) => {
                        // Prioritize videos based on the file extension
                        const aIsVideo = isVideo(a.url);
                        const bIsVideo = isVideo(b.url);
                        return bIsVideo - aIsVideo || a.order_number - b.order_number;
                    });
                    setArticle({...response.data, image_list: sortedMedia});
                    setRecentArticles(response.data.category_articles); // Populate recentArticles with category_articles from the response
                } catch (error) {
                    console.error('Error fetching article:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchArticle();
        }, [articleID]);





        const [isFullScreen, setIsFullScreen] = useState(false); // State to manage fullscreen mode
    let lastTap = null;

    const [recentArticles, setRecentArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const contentData = useSelector((state) => state.selectedContent.contentData);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    };

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50 // Adjust as needed
    };


    /*
    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        // Check if the viewable items list is not empty
        if (viewableItems.length > 0) {
            // Assuming the first viewable item corresponds to the current item
            // Update currentIndex state to reflect the index of the currently visible item
            const firstViewItem = viewableItems[0].item;
            const visibleIndex = article.image_list.findIndex(item => item.url === firstViewItem.url);
            setCurrentIndex(visibleIndex);
        }
    }, [article.image_list]);
*/

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const firstItem = viewableItems[0];

            if (firstItem.isViewable && firstItem.item.isVideo) {
                setVisibleItem(firstItem.item.url); // Use a unique identifier for the visible item
            } else {
                setVisibleItem(null);
            }
        }
    }, []);


    const renderDotIndicators = () => {
        return (
            <View style={styles.dotContainer}>
                {article.image_list.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            { backgroundColor: currentIndex === index ? 'darkgrey' : 'lightgrey' }
                        ]}
                    />
                ))}
            </View>
        );
    };

    const dispatch = useDispatch();
    {/*`${API_URL}/article/${articleID}65c78faca3d893aa2feaf882`*/}

    const { width } = Dimensions.get('window');
// Calculate a proportional height based on the new width; you might need to adjust this formula based on your content
    const height = (width * 9) / 16;





    {/*
        useEffect(() => {
            setIsLoading(true);

            // Mimic fetching an article with the given structure
            setTimeout(() => {
                const fetchedArticle = {
                    "_id": "659c06edde37ff6ce7049877",
                    "category": {
                        "_id": "6582bfbcf8e40709d39c88a3",
                        "name": "Sport",
                        "order_number": 6,
                        "category_url": "sport"
                    },
                    "display_name": "A.S.",
                    "title": "Džeko imitirao povrijeđenog Livakovića, snimak postao hit u Turskoj",
                    "subtitle": "Livaković je u finišu susreta dobio nezgodan udarac od protivničkog igrača nakon čega je ostao ležati na zemlji, žaleći se na povredu",
                    "text": [{"regular": "hehe"}, {"bold": "hehe"}, {"italic": "hehe"}, {"image": "https://hayat.ba/wp-content/uploads/2023/04/WHO-logo11111-696x348.png"}, {"survey": "65bd7b4a3a6c806199513155"}, {"instagram": "https://www.instagram.com/reel/C3KqkDKoezY/embed/captioned"}, {"facebook": {"changingThisBreaksApplicationSecurity": "<iframe src=\"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FHayatMediaBIH%2Fposts%2Fpfbid0Zz7uB1MYaJ76DNyNt573YzJcfzFDFZVzhaVU9vVS7CwJ9Zkg4jZxVFfpdJkmWmpel&show_text=true&width=500\" width=\"500\" height=\"481\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowfullscreen=\"true\" allow=\"autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share\"></iframe>"}}, {"x": "<blockquote class=\"twitter-tweet\"><p lang=\"en\" dir=\"ltr\">Azerbaijan has up to 6.5 million voters - CEC Chairman <a href=\"https://twitter.com/hashtag/election?src=hash&amp;ref_src=twsrc%5Etfw\">#election</a> <a href=\"https://twitter.com/hashtag/azerbaijan?src=hash&amp;ref_src=twsrc%5Etfw\">#azerbaijan</a> 🇦🇿 <a href=\"https://t.co/4cau4MjTLj\">pic.twitter.com/4cau4MjTLj</a></p>&mdash; Elma Odobašić (@elmaodobasic01) <a href=\"https://twitter.com/elmaodobasic01/status/1754814947639329071?ref_src=twsrc%5Etfw\">February 6, 2024</a></blockquote> <script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>"}, {"tiktok": {"changingThisBreaksApplicationSecurity": "<iframe loading=\"lazy\" scrolling=\"no\" sandbox=\"allow-popups allow-popups-to-escape-sandbox allow-scripts allow-top-navigation allow-same-origin\" class=\"tiktok-iframe ng-star-inserted\" style=\"height: 739px; width: 324px; margin: 10px auto; border-radius: 9px; border: solid 1px #d7d7d7; display: block; visibility: unset; max-height: 739px;\" src=\"https://www.tiktok.com/embed/v2/7321673333001555242?_r=1&_t=8iwYBWXgLwb\"></iframe>"}}, {"youtube": {"changingThisBreaksApplicationSecurity": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/hWIiTi4-Y7o?si=hDJNFJVXaDVvpOcM\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>"}}],
                    "date_time": "2024-01-08T14:30:05.203Z",
                    "priority": 4,
                    "text_post": null,
                    "photo_post": true,
                    "video_post": null,
                    "survey_post": "",
                    "published": true,
                    "image_list": [
                        {
                            url: "https://hw-videos.worldstarhiphop.com/u/vid/2024/02/GdJnfhFaRFm1.mp4",
                            order: 0,
                            tag: "",
                            order_number: 1,
                            isVideo: true
                        }, // Video
                        {
                            url: "https://hayat.ba/wp-content/uploads/2024/02/pravda-za-amru-o.jpeg",
                            order: 1,
                            tag: "",
                            order_number: 2
                        },
                        {
                            url: "https://hayat.ba/wp-content/uploads/2024/02/kupac-trgovina-brasno-foto-M-Jakovljevic-ringier-scaled-872x610-1-696x487.jpg",
                            order: 2,
                            tag: "",
                            order_number: 3
                        },
                        {
                            url: "https://hayat.ba/wp-content/uploads/2024/02/rat-u-ukrajini24222041-696x391.jpeg",
                            order: 3,
                            tag: "",
                            order_number: 4
                        },
                        {
                            url: "https://hayat.ba/wp-content/uploads/2024/02/rat-u-ukrajini24222043.jpeg",
                            order: 4,
                            tag: "",
                            order_number: 5
                        },
                    ],
                    "tags": [
                        {
                            "_id": "659c06e9de37ff6ce7049876",
                            "tag": "EDIN DŽEKO",
                            "active": true
                        }
                    ],
                    "url_title": "džeko-imitirao-povrijeđenog-livakovića,-snimak-postao-hit-u-turskoj",
                    "creator": "",
                    "edited": []
                };

                setArticle(fetchedArticle);
                setIsLoading(false);
            }, 1000); // Simulate network request delay
        }, [articleID]);
    */}



    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!article) {
        return <Text>Article not found.</Text>;
    }

    const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
    const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;





    const handleDoubleTap = (item, index) => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            setCurrentIndex(index); // Save the index of the tapped item
            setIsModalVisible(true); // Open the modal
        } else {
            lastTap = now;
        }
    };




    // Function to render either an image or a video based on the file extension
    const renderMedia = ({item, index}) => {
        const mediaHeight = screenWidth * (9 / 16); // Maintain 16:9 aspect ratio

        // Determine if this video should be playing based on its visibility and modal state
        const shouldVideoPlay = item.isVideo && item.url === visibleItem && !isModalVisible;

        if (item.isVideo) {
            return (
                <TouchableOpacity onPress={() => handleDoubleTap(item, index)} activeOpacity={0.8} style={{marginVertical:5}}>
                    <Video
                        source={{ uri: item.url }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="contain"
                        shouldPlay={shouldVideoPlay} // Only play if this video is currently visible and the modal is not open
                        isLooping
                        useNativeControls
                        style={{ width: screenWidth, height: mediaHeight, alignSelf:"center", justifyContent:"center"}}
                    />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onPress={() => handleDoubleTap(item, index)} activeOpacity={0.8} style={{marginVertical:5}}>
                    <Image
                        source={{ uri: item.url }}
                        style={{ width: screenWidth, height: mediaHeight }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            );
        }
    };



    // Determine the content to display based on the first item in image_list
    const contentToDisplay = article && article.image_list.length > 0 ? (
        <FlatList
            data={article.image_list}
            renderItem={renderMedia}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate={"fast"} // Adjusts the deceleration rate of the scroll to make swiping feel more "deliberate"
            snapToAlignment={"start"} // Ensures that the snapping aligns to the start of each item
            snapToInterval={screenWidth} // Assuming each item fills the width of the screen
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
        />



    ) : (
        <Image source={image} style={styles.heroImage} />
    );



    const facebookHtmlContent = `\`<div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;">
    <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FHayatMediaBIH%2Fposts%2Fpfbid0Zz7uB1MYaJ76DNyNt573YzJcfzFDFZVzhaVU9vVS7CwJ9Zkg4jZxVFfpdJkmWmpel&show_text=true&width=900" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" scrolling="no"></iframe>
</div>`;
    const instagramEmbedHtml = `<iframe src="https://www.instagram.com/reel/C3KqkDKoezY/embed/captioned" width="400" height="480" frameborder="0" allowfullscreen></iframe>`;
    const facebookEmbedHtml = `<div style="position: relative; padding-bottom: 150%; overflow: hidden;">
    <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FHayatMediaBIH%2Fposts%2Fpfbid0Zz7uB1MYaJ76DNyNt573YzJcfzFDFZVzhaVU9vVS7CwJ9Zkg4jZxVFfpdJkmWmpel&show_text=true&width=1000" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" scrolling="no"></iframe>
</div>
`;
    const twitterEmbedHtml = `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Azerbaijan has up to 6.5 million voters - CEC Chairman <a href="https://twitter.com/hashtag/election">#election</a> <a href="https://twitter.com/hashtag/azerbaijan">#azerbaijan</a> 🇦🇿 <a href="https://t.co/4cau4MjTLj">pic.twitter.com/4cau4MjTLj</a></p>&mdash; Elma Odobašić (@elmaodobasic01) February 6, 2024</blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`;

    const youtubeEmbedHtml = `<iframe  src="https://www.youtube.com/embed/hWIiTi4-Y7o?si=hDJNFJVXaDVvpOcM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;

    const youtubeHTML = `
    <html >
      <head>
        <style>
          iframe{
          width: 100% !important;
          height: 100% !important;
          }
        </style>
      </head>
      <body>
        ${youtubeEmbedHtml}
      </body>
    </html>
  `;

    const instagramHTML = `
    <html >
      <head>
        <style>
          iframe{
          width: 100% !important;
          height: 100% !important;
          }
        </style>
      </head>
      <body>
        ${instagramEmbedHtml}
      </body>
    </html>
  `;

    const tiktokEmbedHtml = `
    <iframe src="https://www.tiktok.com/embed/v2/7321673333001555242?_r=1&_t=8iwYBWXgLwb" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; scale: 200%;margin-top: 100%" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" scrolling="no"></iframe>
>
`;

    const modifyIframeHtml = (htmlContent) => {
        // Extract the src attribute value from the original iframe
        const srcMatch = htmlContent.match(/src="([^"]+)"/);
        const src = srcMatch ? srcMatch[1] : '';

        // Construct a new iframe HTML string with the desired style
        const newIframeHtml = `
    <iframe src="${src}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; scale: 200%; margin-top: 100%" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" scrolling="no"></iframe>
  `;

        return newIframeHtml;
    };

    const modifyFacebookIframeHtml = (htmlContent) => {
        // Decode HTML entities in the content for easier manipulation
        let decodedHtmlContent = decodeURIComponent(htmlContent);

        // Correctly extract the src attribute's URL
        const srcRegex = /(src=")([^"]+)(")/;
        const match = decodedHtmlContent.match(srcRegex);

        if (match && match.length > 2) {
            // Extracted URL from the src attribute
            let srcUrl = match[2];

            // Modify the width parameter in the URL
            srcUrl = srcUrl.replace(/width=\d+/, 'width=850');

            // Optionally, adjust the height parameter or any other attributes as needed
            // For example, changing height based on your requirements
            // srcUrl = srcUrl.replace(/height=\d+/, 'height=800');

            // Construct the new iframe HTML with the modified src URL
            const newIframeHtml = `
<iframe src="${srcUrl}" width="1000" height="1000" style="border:none;overflow:hidden; position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" scrolling="no"></iframe>
`;
            return newIframeHtml;
        }

        // Return the original content if the src attribute is not found or any other issue occurs
        return htmlContent;
    };








    const xHTML = `
    <html >
      <head>
        <style>
          blockquote{
          width: 100% !important;
          height: 100% !important;
          }
        </style>
      </head>
      <body>
        ${twitterEmbedHtml}
      </body>
    </html>
  `;


    return (
        <ScrollView >
            <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: "#1A2F5A" }}>
                <StatusBar
                    translucent
                    backgroundColor="#1A2F5A"
                    barStyle="light-content"
                />
            </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => {
                        setIsModalVisible(!isModalVisible);

                    }}>

                    <BlurView intensity={120} tint={"dark"} style={styles.fullScreenCentered} >

                        <TouchableOpacity

                            onPress={() => setIsModalVisible(false)}
                            style={styles.closeButton}>
                            <Image
                                source={require('../assets/closeIcons/Close0.png')}
                                style={styles.closeIcon}
                                resizeMode={"contain"}
                            />
                        </TouchableOpacity>

                        <View style={styles.centeredView}>

                            <FlatList
                                data={article.image_list}
                                renderItem={renderMedia}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                initialScrollIndex={currentIndex}
                                getItemLayout={(data, index) => ({
                                    length: screenWidth,
                                    offset: screenWidth * index,
                                    index,
                                })}
                            />
                        </View>
                    </BlurView>
                </Modal>





            <ArticleHeader />

            {article && (
                <>
                    <View style={{backgroundColor:"#f6f6f6"}}>
                        <View style={{margin:10, backgroundColor:"#f6f6f6"}}>
                            {contentToDisplay}
                        </View>
                    </View>
                    {renderDotIndicators()}
                </>
            )}


            <View style={styles.wrapper}>

                <Text style={styles.title}>{article.title}</Text>

                <View style={styles.greyContent}>
                    <Text style={styles.author}>   </Text>


                    <View style={styles.dateTimeWrapper}>
                        {/*<Text style={styles.date}>{formatDate(article.date_time)}</Text>*/}


                    </View>
                </View>

                <Text style={styles.subTitle}>{article.subtitle}</Text>





                {article && article.text.map((textItem, index) => {
                    if (textItem.regular) {
                        return <Text key={index} style={styles.regularText}>{textItem.regular}</Text>;
                    } else if (textItem.bold) {
                        return <Text key={index} style={styles.boldText}>{textItem.bold}</Text>;
                    } else if (textItem.italic) {
                        return <Text key={index} style={styles.italicText}>{textItem.italic}</Text>;
                    } else if (textItem.image) {
                        return <Image key={index} source={{ uri: textItem.image }} style={styles.image} />;
                    } else if (textItem.youtube) {
                        const htmlContent = textItem.youtube.changingThisBreaksApplicationSecurity;
                        return (
                            <WebView
                                key={index}
                                originWhitelist={['*']}
                                style={{ height: 300, width:"100%", opacity: 0.99, overflow: 'hidden', display:'flex', alignItems:'center', marginVertical: 30  }}
                                source={{ html: youtubeHTML }}
                                allowsFullscreenVideo={true}
                                javaScriptEnabled={true}
                            />
                        );
                    } else if (textItem.survey) {
                        // Assuming you have a component to handle survey embedding
                        return <Survey surveyId={textItem.survey}  key={index}/>;
                    } else if (textItem.facebook) {
                        // Modify the original HTML content using the function
                        const originalHtmlContent = textItem.facebook.changingThisBreaksApplicationSecurity;
                        const modifiedIframeHtml = modifyFacebookIframeHtml(originalHtmlContent);

                        const facebookHTML = `
    <html>
      <head>
        <style>
          body, html {
            margin: 0;
            padding: 0;
            overflow: hidden;
            height: 100%;
          }
          iframe {
            width: 100% !important;
            height: 100% !important;
          }
        </style>
      </head>
      <body>
        <div style="position: relative; height: 100%; width: 100%; overflow: hidden; margin-top: 50px; margin-bottom: 50px ">
          ${modifiedIframeHtml}
        </div>
      </body>
    </html>
  `;

                        return (
                            <WebView
                                key={index}
                                originWhitelist={['*']}
                                style={{ flex: 1, height: 260, width: "100%", backgroundColor: "transparent", opacity: 0.99, overflow: 'hidden' }}
                                source={{ html: facebookHTML }}
                                allowsFullscreenVideo={true}
                            />
                        );
                    }

                    else if (textItem.tiktok) {
                        // Extract the modified HTML content using the function
                        const originalHtmlContent = textItem.tiktok.changingThisBreaksApplicationSecurity;
                        const modifiedIframeHtml = modifyIframeHtml(originalHtmlContent);

                        const tiktokHTML = `
    <html>
      <head>
        <style>
          body, html {
            margin: 0;
            padding: 0;
            overflow: hidden;
            height: 100%;
          }
          iframe {
            width: 100% !important;
            height: 100% !important;
          }
        </style>
      </head>
      <body>
        <div style="position: relative; padding-bottom: 177%; height: fit-content; width: 100%; overflow: hidden; margin-top: 50px; margin-bottom: 50px">
          ${modifiedIframeHtml}
        </div>
      </body>
    </html>
  `;

                        return (
                            <WebView
                                key={index}
                                originWhitelist={['*']}
                                style={{ height: 720,  backgroundColor:"transparent", width: "100%", opacity: 0.99 }}
                                source={{ html: tiktokHTML }}
                            />
                        );
                    }
                    else if (textItem.x) {
                        // Instagram posts can be embedded using WebView as well
                        const htmlContent = textItem.x;
                        const xHTML = `
    <html >
      <head>
        <style>
          blockquote{
          width: 100% !important;
          height: 100% !important;
          }
        </style>
      </head>
      <body>
         <div style="scale: 150%;display: flex;align-items: center; minwidth: 100;min-height: 100%; padding: 40px;margin-left: 25%;margin-top: 105px ">
        ${htmlContent}
        </div>
      </body>
    </html>
  `;
                        return (
                            <WebView
                                key={index}
                                originWhitelist={['*']}
                                style={{ height: 436, opacity: 0.99, overflow: 'hidden' ,backgroundColor:"transparent", }}
                                source={{ html: xHTML }}

                            />
                        );
                    }
                    else if (textItem.instagram) {
                        // Instagram posts can be embedded using WebView as well
                        const htmlContent = textItem.instagram;
                        return (
                            <WebView
                                key={index}
                                originWhitelist={['*']}
                                style={{ height: 680, opacity: 0.99, overflow: 'hidden', width:"100%"  }}
                                source={{ html: instagramHTML }}

                            />
                        );
                    }

                    // Add more conditionals as needed for additional types
                })}




                <View style={styles.tagsShareWrapper}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.tagsScrollView}>
                        <View style={styles.tags}>
                            {article.tags.map((tagItem, index) => (
                                <TouchableOpacity key={index} style={styles.tag} activeOpacity={0.82}>
                                    <Text style={styles.tagText}>{tagItem.tag}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>

                    <View style={styles.shareIcons}>
                        <ShareButtons />
                    </View>
                </View>

            </View>

            <View style={styles.categoryNews}>
                <Text style={styles.categoryTypeText}>Vise iz {article.category.name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {recentArticles.map((article, index) => {
                        const imageSource = article.image_list && article.image_list.length > 0 ? { uri: article.image_list[0].url } : null;
                        return (
                            <SuggestedNews
                                key={index}
                                imageSource={imageSource}
                                headline={article.title}
                                articleID={article._id} // Assuming each article has a unique _id field
                                navigation={navigation} // Pass the navigation prop down to the SuggestedNews component
                            />
                        );
                    })}
                </View>
            </View>


            {/*The idea was to have 3x2, suggested + other, but we did it right now as 6 suggested from same category
            <View style={styles.otherNews}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {recentArticles.slice(3, 6).map((article, index) => {
                        const imageSource = article.image_list && article.image_list.length > 0 ? { uri: article.image_list[0].url } : image;
                        return (
                            <SuggestedNews
                                key={index}
                                imageSource={imageSource}
                                headline={article.title}
                            />
                        );
                    })}
                </View>
            </View>
            */}






        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor:'#fff',
    },
    wrapper:{
        paddingHorizontal:8,
    },
    heroImage: {
        width: '100%',
        height: undefined,
        aspectRatio: 16 / 9,
        resizeMode:"cover"
    },

    video: {
        width: '100%',
        height: 200, // You can adjust this value as needed
    },
    boldText:{
        fontWeight:"bold"
    },
    italicText:{
        fontStyle:"italic"
    },

    title:{
        fontSize:22,
        fontWeight:'500',
        marginTop:8,
        marginBottom:16,
    },
    greyContent:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom:30,
    },

    dateTimeWrapper:{
        flexDirection:"row",
    },
    author:{
        fontSize:12,
        color:"#818181",
        fontWeight:"500"
    },
    date:{
        fontSize:12,
        color:"#818181",
    },
    time:{
        fontSize:12,
        color:"#818181",
        marginLeft:10,
        marginRight:4
    },

    subTitle:{
        fontSize:14,
        fontWeight:'500',
        marginBottom:30,
    },
    text:{
        marginBottom:14
    },
    tags:{
      flexDirection:"row",

    },
    tag:{
        paddingHorizontal:12,
        paddingVertical:6,
        borderRadius:6,
        backgroundColor:"#1a2f5a",
        justifyContent:"center",
        alignItems:"center",
        marginLeft:2,
    },
    tagText:{
        color:"#fff",
        fontSize:12
    },

    tagsScrollView:{
        alignSelf:"flex-start"
    },

    tagsShareWrapper:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-between",
        marginTop:26,
        marginBottom:15
    },
    shareIcons:{
        alignSelf:"flex-end", marginRight:20, marginTop:20
    },

    suggestedNews:{
        flexDirection:"row"
    },
    categoryNews:{
        paddingVertical:16,
        backgroundColor:"#e5e5e5",
        paddingHorizontal:8
    },
    categoryTypeText:{
        fontSize:16,
        marginBottom:16,
    },

    otherNews:{
        paddingVertical:16,
        backgroundColor:"#e5e5e5",
        paddingHorizontal:8
    },
    media: {
        width: screenWidth,
        height: 200, // Adjust height as needed
    },
    carousel: {
        flexGrow: 0, // Prevents the FlatList from trying to fill the screen
        height: 200, // Match your media height
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10, // Adjust as needed
    },
    dot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        marginHorizontal: 4, // Adjust space between dots as needed
    },
    fullScreenCentered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        width: '100%', // You might want to adjust this
        height: '50%', // Adjust based on your content or screen size
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 30, // Adjust the distance from the top as needed
        right: 16, // Adjust the distance from the right as needed
        zIndex: 1, // Ensure it stays on top of other components
    },
    closeIcon:{
        height:26,
        width:26
    }


});
export default Article;
