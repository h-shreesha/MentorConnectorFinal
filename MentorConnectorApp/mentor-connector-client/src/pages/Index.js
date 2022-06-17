import React from 'react';
import Header from '../components/Header';
import HomeContent from '../components/HomeContent';
import HomeFooter from '../components/HomeFooter';

function Index() {
    return (
        <div className="App">
            <Header />
            <HomeContent />
            <HomeFooter />
        </div>
    );
}

export default Index;