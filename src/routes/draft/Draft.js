import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/api";
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Logo from './IMGBaner.png'

import './Draft.css';
import { AuthContext } from "../../context/AuthContext";


function Draft() {
  const { setIsLoading } = useContext(AuthContext)

  const params = useParams();
  const [data, setData] = useState('');
  console.log("data: ", data)
  useEffect(() => {

    const getApi = async () => {
      setIsLoading(true)
      await axios
        .post(`certificate/check/${(params?.id)?.toUpperCase()}`)
        .then((certificateDrafted) => {
          // console.log(certificateDrafted)
          setData(certificateDrafted?.data)

          setTimeout(() => {
            setIsLoading(false)

          }, 1000);

        })
        .catch(err => {
          setIsLoading(false)
          console.log(err)
        })
    }
    getApi()

  }, [params]);


  return (
    <div className="pdf_Cont">
      <div className="darft_container ">
        <div className="boxDarft">
          <Link to="/" className="main_pageLink">
            <FiArrowLeft /> Asosiy
          </Link>
          <i></i>
        </div>
        <div className="pdf_Box">
          <div className="pdf_banner">
            <div className="pdf_banner_img">
              <div className="pdf_bannerImgBox">
                <img src={Logo} alt="" />
              </div>
              <h1>Algorithm <br /> Education center</h1>
            </div>


            <div className="by">
              <i>The following details are confirmed by:</i> <br />
              <i><b>Algoritm21.uz</b></i>
            </div>
          </div>
          <div className="pdf_main">
            <p>Fullname</p>
            <b>
              {data?.name}  {data?.surname}
            </b>
          </div>
          <div className="pdf_main">
            <p>Catigory</p>
            <b>
              {data?.courseName}
            </b>
          </div>
          <div className="pdf_main">
            <p>ID </p>
            <b>

              {data?.id}
            </b>

          </div>
          <div className="pdf_main">
            <p>Given date</p>
            <b>

              {data?.givenDate}
            </b>
          </div>

          <div className="pdf_main">
            <p>Teacher's name</p>
            <b>
              {data?.teachername}
            </b>
          </div>

          <div className="pdf_main pdf-text">
            <p>© Algoritm Education, 2023 All rights reserved.</p>
          </div>

        </div>
      </div >
    </div>
  );

}

export default Draft;
