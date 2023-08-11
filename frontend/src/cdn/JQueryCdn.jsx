import React,{useEffect} from 'react' // eslint-disable-line no-unused-vars

function JQueryCdn() {
  useEffect(()=>{
    const script =  document.createElement("script");
    script.src = "https://code.jquery.com/jquery-latest.min.js";
    script.async = true;
    document.body.appendChild(script);
  });

  return 
    <input />;
  
}

export default JQueryCdn