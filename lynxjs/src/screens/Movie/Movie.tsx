import {useLocation} from "react-router";
import {PageView} from "../../common/index.js";

import '../Movies/Movies.css';

export function Movie() {
    const location = useLocation();
    const movieData = location.state?.movie;

    return (
        <PageView isBack title="Movie Detail">
            <view class="display:flex;flex-direction:column;">
                <scroll-view
                    style={{width: "calc(100% - 10px)", height: "85vh"}}
                    scroll-orientation="vertical">
                    <image
                        src={`https://image.tmdb.org/t/p/w342${movieData.poster_path || movieData.poster_path}`}
                        style="width:90vw;height:400px;object-fit:contain;align-self:center"
                    />
                    <view style="padding:20px">
                        <text className="Title">{movieData.title}</text>
                        <text className="Title2">{movieData.description}</text>
                        <text className="Title2">Rating: ★ {movieData.vote_average.toFixed(1)}/10</text>
                        <text className="Title2">Release Date: {movieData.release_date}</text>
                        <text className="Title2">Overview: {movieData.overview}{movieData.overview}</text>
                    </view>
                </scroll-view>
            </view>
        </PageView>
    )
}