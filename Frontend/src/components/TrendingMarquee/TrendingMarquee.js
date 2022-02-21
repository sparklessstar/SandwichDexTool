import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import Marquee from "react-easy-marquee";

import "./style.css";

function TrendingMarquee() {

    const trendings =  useSelector((state) => state.trendings.latest);
    const [filteredTrendings, setFilteredTrendings] = useState([]);

    useEffect(()=>{
        
        let ntrendings=[];
        trendings.forEach(d => {
            if(d.platform!=null&&(d.platform.slug == "ethereum"||d.platform.slug == "bnb" ||d.platform.slug == "matic")){
              ntrendings.push(d);
            }
        });
        setFilteredTrendings(ntrendings);
    },[trendings]);

    return (
        <>
            <Marquee className="marquee-bar" duration={50000} background="#fafafa" height="50px" pauseOnHover={true} reverse={true}>
                {
                    filteredTrendings.slice(0,10).map((t, i)=>{
                        return <button key={i} type="button " className="btn btn-primary px-md-2 coin-item mr-2">
                                    &nbsp;{i+1}. 
                                    <img className="coin-item-logo ml-1 mr-1" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${t.id}.png`} />
                                    {t.name}
                                </button>
                    })
                }                
            </Marquee>
        </>
    );
}

export default TrendingMarquee;
