import React, {useEffect, useState} from "react";
import styled from 'styled-components/native';
import Swiper from "react-native-swiper";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {ActivityIndicator, Dimensions, RefreshControl} from "react-native";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";

const API_KEY=`fce823494296d624f80d2561dfc41f5f`;

const Container = styled.ScrollView`
`;
const Loader = styled.View`
    flex:1;
    justify-content: center;
    align-items: center;
`;
const ListTitle = styled.Text`
    color:white;
    font-size: 18px;
    font-weight: 600;
    margin-left: 30px;
`;

const TrendingScroll = styled.ScrollView`
    margin-top:20px;
`;


const ListContainer = styled.View`
    margin-bottom:40px;
`

const ComingSoonTitle = styled(ListTitle)`
    margin-bottom: 20px;
`;


const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] =useState([]);
    const [upcoming, setUpcoming] =useState([]);
    const [trending, setTrending] =useState([]);
    const getTrending = async () => {
        const { results } = await (await fetch(
            `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
        )).json();
        setTrending(results);
    }
    const getUpcoming = async () => {
        const { results } = await (await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
        )).json();
        setUpcoming(results);
    }
    const getNowPlaying = async () => {
        const { results } = await (await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
        )).json();
        setNowPlaying(results);
    }
    const getData = async () => {
        //wait for all of them
        await Promise.all([getTrending(),getUpcoming(),getNowPlaying()]);
        setLoading(false);
    }
    useEffect(() => {
        getData();
    },[])
    const onRefresh = async () => {
        setRefreshing(true);
        await getData();
        setRefreshing(false);
    }
    return loading ? (
            <Loader>
                <ActivityIndicator/>
            </Loader>
        ) : (<Container
        refreshControl = {<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
    >
        <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{ marginBottom:30, width: "100%", height: SCREEN_HEIGHT / 4}}>
            {nowPlaying.map(movie => <Slide key={movie.id}
                                            backdropPath ={movie.backdrop_path}
                                            posterPath ={movie.poster_path}
                                            originalTitle ={movie.original_title}
                                            voteAverage ={movie.vote_average}
                                            overview ={movie.overview}

            />)}
        </Swiper>
        <ListContainer>
            <ListTitle>Trending Movie</ListTitle>
            <TrendingScroll
                contentContainerStyle={{paddingLeft: 30}}
                horizontal
                showsHorizontalScrollIndicator={false}>
                    {trending.map(movie =>
                        <VMedia
                            key={movie.id}
                            posterPath={movie.poster_path}
                            originalTitle={movie.original_title}
                            voteAverage={movie.vote_average}
                        />
                    )}
            </TrendingScroll>
        </ListContainer>
        <ComingSoonTitle>Coming soon</ComingSoonTitle>
        {upcoming.map(movie => (
            <HMedia
                key={movie.id}
                posterPath={movie.poster_path}
                originalTitle={movie.original_title}
                overview={movie.overview}
                releaseDate={movie.release_date}
            />
        ))}
    </Container>)
};

export default Movies;
