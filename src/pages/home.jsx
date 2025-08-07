
import co from '../assets/cosw.png'
import MissionCarousel from '../components/carousel'
import FadingCarousel from '../components/carousel'
import CarouselComponent from '../components/carousel'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Home=()=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
    }, []);

    return (
        <>
        
    {/* Authentication Banner for logged-in users */}
    {isAuthenticated && (
        <div className="auth-banner" role="alert">
            <div className="banner-content">
                <span className="banner-emoji">🎉</span>
                <span className="font-medium">Welcome back! </span>
                <Link to="/dashboard" className="banner-link">
                    Go to your Dashboard to add Interview Experiences and Tasks
                </Link>
            </div>
        </div>
    )}
        
    <section className={`first-Section ${isAuthenticated ? 'with-auth-banner' : ''}`}>
        <div className="Titlediv">
    <h1 className="title">{"{RECursion}"}</h1>
        </div>
    </section>  
    <section id="second-section">
        <div>
        <h2 className="second-title">Programming Community of NIT Durgapur</h2>
        <p>
        We are programming community of NIT Durgapur, with focus on improving coding culture institute wide by conducting regular lectures from beginner to advance topics of programming. Our goal is to increase student's participation in inter-collegiate contest like ACM-ICPC and help them get better.
        </p>
        </div>
        <div className='codeholder'>
            <img className='code' src={co} />
        
        </div>
        
    </section> 
    <section id="whoweare">
    <h2 className='wwa'>
                Who We Are?
            </h2>
        
            <MissionCarousel/>

        

    </section>
    
    <section id="sponsors">
        <h2 className="sponsors-title" >Sponsors</h2>
        
        <div className="d-flex partner-holders">

            <div >
                <img className="rahul"src="https://recursionnitd.vercel.app/static/media/cloudsploit.053a3fe9d5aaed0be17b.png"/>
                <div>

                </div>
            </div>
            <div >
                <img className="rahul" src="https://recursionnitd.vercel.app/static/media/codechef.1a38b654c69317630a95.png"/>
                <div>

                </div>
            </div>
            <div >
                <img className="rahul"src="https://recursionnitd.vercel.app/static/media/jetbrain.svg.a5b396eef43ee9eac03d.png"/>
                <div>

                </div>
            </div>
            

            
        </div>
    </section>  

        </>
    )

}
export default Home