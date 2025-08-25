import React,{useRef} from 'react';
import Cart  from '../components/Cart';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const HorizonCard = ({data =[], heading, trending, media_type}) => {
    const containerRef = useRef()

    const handleNext = () =>{
        containerRef.current.scrollLeft += 300
    }

    const handlePrev =() =>{
        containerRef.current.scrollLeft -= 300
    }


  return (
    <div className='container mx-auto px-3 my-10'>
        <h2 className='text-xl lg:text-2xl font-bold mb-3 text-white '>{heading}</h2>
            <div className=' relative'>
                <div ref={containerRef} className='grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-all scrollbar-none '>
                    {
                        data.map((data,index)=>{
                            return(
                                <Cart key={data.id+'heading'+index} data={data} index={index+1} trending={trending} media_type={media_type}/>        
                            )
                        })
                    }
                </div>

                <div className='absolute top-0 hidden lg:flex justify-between w-full h-full items-center'>
                    <button onClick={handlePrev} className='bg-white p-1 text-black rounded-full -ml-2 z-10'>
                        <ChevronLeftIcon/>
                    </button>
                    <button onClick={handleNext}  className='bg-white p-1 text-black rounded-full -m2-2 z-10'>
                        <ChevronRightIcon/>
                    </button>
                </div>
            </div>
      </div>
  )
}

export default HorizonCard