import React from 'react';
import AdImage from "../components/homeContent/adImage";
import Feature1 from "../components/homeContent/featureDiv/featureDiv1";
import Feature2 from "../components/homeContent/featureDiv/featureDiv2";
import Recommendations from "../components/homeContent/recommendations/recommendations";
import TopCategories from "../components/homeContent/topCategories/topCategories";
import BecomeInstructor from "../components/homeContent/becomeInstructor";



function HomeContent() {
    return (
        <div>
            <AdImage />
            <Feature1 />
            <Recommendations />
            <Feature2 />
            <TopCategories />
            {/* <BecomeInstructor /> */}
        </div>
    );
}

export default HomeContent;