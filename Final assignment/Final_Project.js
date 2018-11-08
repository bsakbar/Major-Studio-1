  d3.json('data/africa.geo.json').then((geojson) => {

            // https://www.mapbox.com/mapbox-gl-js/api/#accesstoken
            mapboxgl.accessToken = 'pk.eyJ1IjoiYnNha2JhciIsImEiOiJjam14em1hNmQweHZlM3FwbHVtbmQ5eXdoIn0.XgXo8yf68EhBjNTZ6nXhpg';

            // https://www.mapbox.com/mapbox-gl-js/api/#map
            let map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/bsakbar/cjo3muxtq0x6a2sprkvtpx3d4',
                center: [6.513,19.669], // 9.1021° N, 18.2812° E
                zoom: 3.2,
                pitch: 100,
                bearing: 50,
                interactive: false
            });
        
            let container = map.getCanvasContainer()
            let svg = d3.select(container).append("svg")
        
        	let transform = d3.geoTransform({point: projectPoint}); // https://bl.ocks.org/Andrew-Reid/496078bd5e37fd22a9b43fd6be84b36b
        	let path = d3.geoPath().projection(transform); // https://github.com/d3/d3-3.x-api-reference/blob/master/Geo-Paths.md
        
         	let featureElement = svg.selectAll("path")
        		.data(geojson.features)
        		.enter()
                .append("path")
                .attr("d", d3.geoPath().projection(transform))
                .attr("stroke", "none")
                .attr("fill", "#D9E4E8")
                .attr("fill-opacity", 0.7)
                .on('mouseover', function(d) {
                    console.log(d);
                    d3.select(this).attr("fill", "#F93D3D", 0);
                    d3.select("#hover")
                        .text(d.properties.name);
                    d3.select('#hover').attr("fill-opacity", 1);
                })
                .on('mouseout', function() {
                    d3.select(this).attr("fill", "#D9E4E8", 0);
                    d3.select('#hover').attr("fill-opacity", 0);
                })
                .on('mousemove', function(d) {
                    d3.select("#hover")
                        .attr('x', function() { return d3.mouse(this)[0] + 20; })
                        .attr('y', function() { return d3.mouse(this)[1] + 10; });
                });
                    
            svg.append("text")
                .attr('id', 'hover')
                .style('fill','#515151'); 
        
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
