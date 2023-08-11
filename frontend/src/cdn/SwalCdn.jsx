import React,{useEffect} from 'react' // eslint-disable-line no-unused-vars

function SwalCdn() {
  useEffect(()=>{
    const script =  document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11.0.18/dist/sweetalert2.all.min.js";
    script.async = true;
    document.body.appendChild(script);
  });

  return 
    <input />;
  
}

export default SwalCdn