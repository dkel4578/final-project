import React, { useState,  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPage from './AdminPage';
import HomePage from '../pages/HomePage';
import Swal from "sweetalert2";

const AdminAuth = ({ Component, userInfo }) => {

  const [component, setComponent] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("Auth: "+JSON.stringify(userInfo));
    if (userInfo.status === "S") {
      setComponent(<AdminPage />);
    }else if(userInfo.status == null || userInfo.status == "" || userInfo.status == undefined){
      setComponent(<HomePage />);
    }else {
      Swal.fire({
        icon: "error",
        title: "접근권한",
        text: "접근 권한이 없습니다.",
        width: 360,
      });
      navigate('/');
    }
  }, [Component, navigate, userInfo]);

  return component;
};

export default AdminAuth;