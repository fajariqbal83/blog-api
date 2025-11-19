
async function loadBlogs() {
  let loadUrl = "https://wordpress-1471720-5962383.cloudwaysapps.com/wp-json/custom/v1/blog/";  
  
  const urlResponse = await fetch(loadUrl); 
  
   console.log(urlResponse); 
  
  const data = await urlResponse.json();     

  console.log(data);                          
}

loadBlogs();   




