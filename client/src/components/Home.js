import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserList from "./UserList";

const Home = ({ socket }) => {
  const navigate = useNavigate();

  return (
    <div className='container-react'>
      <section className="af-layout-module">
        <div className="no-padding no-margin af-layout-module-content af-module-news
                                    af-layout-module-content--upper
                ">
          <div id="banner-header" className="no-padding relative hidden-phone" data-af-role="banner-header">
            <img id="banner-img"
                 src="https://www.devincialumni.com/templates/common/images/background/af-layout-module-addressbook.jpg"
                 alt="Module banner" className="af-layout-module__background hidden"/>
              <div id="banner-holder"
                   className="af-layout-module__title flex-container flex-jc-center flex-ai-center flex-w-max cover cover-single-page bg-graylighter "
                   style={{backgroundImage: "url('https://www.devincialumni.com/templates/common/images/background/af-layout-module-addressbook.jpg')"}}>
                <div className="flex-container flex-h-max flex-ai-center actions-module-home relative">
                  <div className="row-fluid">
                    <div className="col-xs-12 span12">
                      <h1 className="cl-white relative text-center af-header-module__title">
                        Annuaire
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>
      <section className='recherche'>
        <div className='recherche-bar'>
        </div>
        <UserList />
      </section>
    </div>
  );
};

export default Home;