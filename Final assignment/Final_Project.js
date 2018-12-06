d3.json('data/africa.geo.json').then((geojson) => {

          // https://www.mapbox.com/mapbox-gl-js/api/#accesstoken
          mapboxgl.accessToken = 'pk.eyJ1IjoiYnNha2JhciIsImEiOiJjam14em1hNmQweHZlM3FwbHVtbmQ5eXdoIn0.XgXo8yf68EhBjNTZ6nXhpg';

          // https://www.mapbox.com/mapbox-gl-js/api/#map
          let map = new mapboxgl.Map({
              container: 'map',
              style: 'mapbox://styles/bsakbar/cjo3i2pfx2l8h2to7hrnvto7k',
              center: [15.319,29.721], // 6.513,19.669
              zoom: 2.8,
              pitch: 100,
              bearing: 50,
              interactive: false
          });

          let container = map.getCanvasContainer()
          let svg = d3.select(container).append("svg")

        let transform = d3.geoTransform({point: projectPoint}); // https://bl.ocks.org/Andrew-Reid/496078bd5e37fd22a9b43fd6be84b36b
        let path = d3.geoPath().projection(transform); // https://github.com/d3/d3-3.x-api-reference/blob/master/Geo-Paths.md
      // #091116 < dark navy / #0a141c < navy / #f93d3d < red
        let featureElement = svg.selectAll("path")
          .data(geojson.features)
          .enter()
              .append("path")
              .attr("d", d3.geoPath().projection(transform))
              .attr("stroke", "none")
              .attr("fill", "#0a141c")
              .attr("fill-opacity", 0.5)
              .on('mouseover', function(d) {
                  // console.log(d);
                  d3.select(this).attr("fill", "#091116", 0);
                  d3.select("#hover")
                      .text(d.properties.name);
                  d3.select('#hover').attr("fill-opacity", 1);
              })
              .on('mouseout', function() {
                  d3.select(this).attr("fill", "#0a141c", 0);
                  d3.select('#hover').attr("fill-opacity", 0);
              })
              .on('mousemove', function(d) {
                  d3.select("#hover")
                      .attr('x', function() { return d3.mouse(this)[0] + 20; })
                      .attr('y', function() { return d3.mouse(this)[1] + 10; });
              });

          svg.append("text")
              .attr('id', 'hover')
              .style('fill','#f93d3d');

          function update() {
              featureElement.attr("d", path);
          }

          map.on("viewreset", update)
          map.on("movestart", function(){
          svg.classed("hidden", true);
        });
          map.on("rotate", function(){
          svg.classed("hidden", true);
        });
          map.on("moveend", function(){
          update();
          svg.classed("hidden", false);
        })

          update()
        function projectPoint(lon, lat) {
              let point = map.project(new mapboxgl.LngLat(lon, lat));
          this.stream.point(point.x, point.y);
        }

      });

var electricity_data = [];
d3.csv("data/access_electricity_data.csv", function(data) {
    electricity_data.push(data)
});
var primary_education = [];
d3.csv("data/Primary_Countries.csv", function(data) {
    primary_education.push(data)
});
var secondary_education = [];
d3.csv("data/Secondary_Countries.csv", function(data) {
    secondary_education.push(data)
});
var population = [];
d3.csv("data/Population.csv", function(data) {
    population.push(data)
});
var landarea = [];
d3.csv("data/Land_Area.csv", function(data) {
    landarea.push(data)
});

function electricity_tab() {
  var elements = document.getElementsByClassName("education-tab");
//   console.log(elements)
  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "none"
  }

  var elements = document.getElementsByClassName("electricity-tab");
  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "block"
  }
}

function education_tab() {
  var elements = document.getElementsByClassName("education-tab");
//   console.log(elements)
  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "block"
  }

  var elements = document.getElementsByClassName("electricity-tab");
  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "none"
  }
}

function right_arrow() {
  var elements = document.getElementsByClassName("right-arrow");
//   console.log(elements)
  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "none"
  }

  var elements = document.getElementsByClassName("right-arrow-click");
  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "block"
  }
}

function left_arrow() {
  var elements = document.getElementsByClassName("right-arrow");
  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "block"
  }

  var elements = document.getElementsByClassName("right-arrow-click");
  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "none"
  }
}

// populating svg with country related data happens here!
function submit_arrow() {
  var elements = document.getElementsByClassName("right-arrow-click");
  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "none"
  }

  var elements = document.getElementsByClassName("right-arrow");
  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "none"
  }

  //insert delay here
  var country_electricity, country_population, country_landarea;
  var country_education = [];
  var country = document.getElementById("country_textbox").value
  for (let i=0; i<electricity_data.length; i++){
    if (country == electricity_data[i]["Country_Name"]){
      country_electricity = electricity_data[i]
    }
  }

  let schools = document.getElementsByName("school");
  for (var i=0; i<schools.length; i++){
     if (schools[i].checked == true){
       var school = schools[i].value
     }
  }
  if(school == "PRIMARY"){
    for (let i=0; i<primary_education.length; i++){
      if (country == primary_education[i]["Country"]){
        country_education.push(primary_education[i])
      }
    }
  }else if(school == "SECONDARY"){
    for (let i=0; i<secondary_education.length; i++){
      if (country == secondary_education[i]["Country"]){
        country_education.push(secondary_education[i])
      }
    }
  }

  var year1 = parseInt(document.getElementById("YearRange1").value) + 2000;
  var year2 = parseInt(document.getElementById("YearRange2").value) + 2000;

  let genders = document.getElementsByName("gender")
  for (var i=0; i<genders.length; i++){
     if (genders[i].checked == true){
       var gender = genders[i].value
     }
  }
  var this_gender, education_year1 = {}, education_year2 = {}

  for (let i=0; i<country_education.length; i++){
    this_gender = country_education[i]["Indicator"].split(",")[1].split(" ")[1]

    if(country_education[i]["Year"] == year1){
      education_year1[this_gender] = country_education[i]["Value"]
    }
    else if(country_education[i]["Year"] == year2){
      education_year2[this_gender] = country_education[i]["Value"]
    }
  }

  for (let i=0; i<population.length; i++){
    if (country == population[i]["Country Name"]){
      country_population = population[i]
    }
  }
  for (let i=0; i<landarea.length; i++){
    if (country == landarea[i]["Country Name"]){
      country_landarea = landarea[i]
    }
  }

  document.getElementById("country_title").innerHTML = country_electricity["Country_Name"]
  document.getElementById("country_desc").innerHTML = country_electricity["Country_Name"]

  document.getElementById("country_year1_main").innerHTML = year1
  document.getElementById("country_year2_main").innerHTML = year2
  document.getElementById("country_year1_bracket").innerHTML = year1
  document.getElementById("country_year2_bracket").innerHTML = year2
  document.getElementById("country_year1_desc").innerHTML = year1
  document.getElementById("country_year2_desc").innerHTML = year2

  // document.getElementById("region_bracket").innerHTML = region.toUpperCase()
  document.getElementById("school_bracket").innerHTML = school.toUpperCase() + " SCHOOL"
  document.getElementById("gender_bracket").innerHTML = gender.toUpperCase()

  document.getElementById("year1_access_electricity").innerHTML = parseFloat(country_electricity[year1]).toFixed(2) + "%"
  document.getElementById("year2_access_electricity").innerHTML = parseFloat(country_electricity[year2]).toFixed(2) + "%"
  document.getElementById("year1_males").innerHTML = parseInt(education_year1['male']).toLocaleString()
  document.getElementById("year1_females").innerHTML = parseInt(education_year1['female']).toLocaleString()
  document.getElementById("year2_males").innerHTML = parseInt(education_year2['male']).toLocaleString()
  document.getElementById("year2_females").innerHTML = parseInt(education_year2['female']).toLocaleString()

  document.getElementById("population_year1").innerHTML = year1
  document.getElementById("population_year1_value").innerHTML = parseInt(country_population[year1]).toLocaleString()
  document.getElementById("population_year2").innerHTML = year2
  document.getElementById("population_year2_value").innerHTML = parseInt(country_population[year2]).toLocaleString()
  document.getElementById("landarea").innerHTML = parseInt(country_landarea[2017]).toLocaleString()
  document.getElementById("map").style.display = "none"
  // d="M1367.2,485.2v18l13,13h193v-18l-13,-13Z"

  var elements = document.getElementsByClassName("country-svg");
  elements['country-map'].src="SVG/"+country_electricity["Country_Name"]+".svg"

  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "block"
  }


}


function close_button(){

  document.getElementById("map").style.display = "block"
  var elements = document.getElementsByClassName("country-svg");
  for (let i=0; i<elements.length; i++){
    elements[i].style.display = "none"
  }

  // resetting all buttons
  var elements = document.getElementsByClassName("radio");
  for (let i=0; i<elements.length; i++){
    elements[i].checked = false
  }
  document.getElementById("country_textbox").value = "";
  document.getElementById("YearRange1").value = "6";
  document.getElementById("YearRange2").value = "10";
  document.getElementById("YearRange").value = "5";

  right_arrow()
  electricity_tab()

}
