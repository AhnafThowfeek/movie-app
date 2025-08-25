import HomeIcon from '@mui/icons-material/Home';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SearchIcon from '@mui/icons-material/Search';

export const navigation =[
    {
        label: "TV Shows",
        href: "tv",
        icon: <PersonalVideoIcon/>
    },
    {
        label: "Movies",
        href: "movie",
        icon: <LiveTvIcon/>
    }
]

export const mobileNavigation = [
    {
        label: 'Home',
        href: '/',
        icon: <HomeIcon/>
    },
    ...navigation,
    {
        label:'search',
        href: '/search',
        icon: <SearchIcon/>
    }
]