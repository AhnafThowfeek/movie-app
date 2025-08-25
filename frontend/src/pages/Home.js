import BannerHome from '../components/BannerHome';
import { useSelector } from 'react-redux';
import HorizonCard from '../components/HorizonCard';
import axios from 'axios';
import useFetch from '../hooks/useFetch';



const Home = () => {
  const trendingData = useSelector(state => state.movieData.bannerData);
  const { data : nowPlayingData} = useFetch('/movie/now_playing')
  const { data : topRatedData } = useFetch('/movie/top_rated')
  const { data : popularTvShowData } = useFetch('/tv/popular')
  const { data : onTheAirShowData } = useFetch('/tv/on_the_air')

   
  
  return (
    <div>
      <BannerHome/>
      <HorizonCard data={trendingData} heading={"Trending Movies"} trending={true}/>
      <HorizonCard data={nowPlayingData} heading={"Now Playing Movies"} media_type={"movie"}/>
      <HorizonCard data={topRatedData} heading={"Top Rated Movies"} media_type={"movie"}/>
      <HorizonCard data={popularTvShowData} heading={"Popular TV Shows"} media_type={"tv"}/>
      <HorizonCard data={onTheAirShowData} heading={"On the Air"} media_type={"tv"}/>
      
    </div>
  )
}

export default Home