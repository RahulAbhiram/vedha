
import co from '../assets/cosw.png'
const Home=()=>{
    return (
        <>
        
    <section className="first-Section">
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
        <div>
            <div className='cards-wwa'>
                <div>
                MISSION
                </div>
                <div>
                Working towards the improvement of campus's coding culture by organizing regular coding classes and contests.
                </div>
            </div>
        </div>
        <div className='wwa-title'>
            <h2 className='wwa'>
                Who We Are?
            </h2>
        </div>

    </section>
    <section id="sponsors">
        <h2 className="sponsors-title" >Sponsors</h2>
        <div className="d-flex partner-holders">

            <div >
                <img className="rahul" src="https://recursionnitd.vercel.app/static/media/algo_zenith.76b5293b2194a07abe75.png"/>
                <div>

                </div>
            </div>
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