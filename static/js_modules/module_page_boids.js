// Ex create a module that implements a page behaviour by clicking a button in the navbar

// Eventually be code from:  <script src='static/nutrient_traffic_lights.js'></script>
  //<script>      
  //  var recipes = {{ recipes|tojson }};       // convert info using tojson filter      
  //  console.log(`recipe_t JS ${recipes[0]['ri_name']} - inline CONCLUDED`);  // sanity check      
  //</script>
var pageTarget;
var pageId = 'boids_page';
var htmlSource = 'static/html/boids.html';
//var jsSource = 'test_pages/u8_fp_flock/u8_fp_flock.js';
var jsSource = 'test_pages/u8_fp_flock/u8_fp_flock_exec_test.js';
var jsElementId = 'flock_boids';

function load_page() {
  console.log(`module_page_boids.js: ${pageId} - loading html: ${htmlSource}`);
  
  fetch(htmlSource)
  .then(function(response) {
    return response.text();
  })
  .then(function(body) {
    document.getElementById(pageTarget).innerHTML = body;
  });

  
  console.log(`module_page_boids.js: ${pageId} - loading JS: ${jsSource}`);
  
  fetch(jsSource)
  .then(function(response) {
    return response.text();
  })
  .then(function(text) {    
    var script = document.createElement("script");
    script.setAttribute("type", "module");
    script.innerHTML = text;
    document.getElementById(jsElementId).appendChild(script);
    //or
    //document.body.appendChild(script);    
  });
}

export function getButtonInfo(containers){
  console.log(`module_page_boids.js: registering ${pageId} - to ${containers.main}`);
  
  pageTarget = containers.main;
  
  var buttonInfo = {};

  buttonInfo.callback = load_page;
  buttonInfo.image    = ''; //'static/images/svg/blank.svg'; // or '' < will use text if no image
  buttonInfo.alt      = 'flockBoids';
  buttonInfo.text     = 'FB';
  
  return buttonInfo;
}

export default getButtonInfo;
