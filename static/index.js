

// var directory_data = {
//     column_row: [],
//     rows: [],
// };

var dir_status = {
    'directory': 0,
    'news': 1,
    'traffic': 2,
    'weather': 3,
};

var curr_status = dir_status.directory;
var directory_page = 0;

// this is not very good to have here, but I see low risk for having this here at the moment
// move this to server side in future
const OPEN_WEATHER_API_KEY = `94bca9a1175503686db16ec39b95265a`;

function render_content() {
    document.getElementById("news-div").style.display = 'none';
    document.getElementById("content-placeholder").innerHTML = "";
    
    if (curr_status == dir_status.directory) {
        document.getElementById("title").innerHTML = "Directory";
        document.getElementById("content-placeholder").innerHTML = get_directory_HTML();
    } else if (curr_status == dir_status.news) {
        document.getElementById("title").innerHTML = "News";
        document.getElementById("news-div").style.display = 'block';
    } else if (curr_status == dir_status.weather) {
        document.getElementById("title").innerHTML = "Weather";
        set_weather_HTML();
    }
    else {

        
    }
}

function get_directory_HTML() {
    result = 
    `
        <div class="col-bar">
    `;

    for (const c in directory_data.column_row) {
        result += 
        `
            <div class="col">
                <h1>${directory_data.column_row[c]}</h1>
            </div>
        `;
    }
    result += 
    `
        </div>
    `;

    for (i = 0; i < 10; i++) {
        index = directory_page*10 + i;

        result += 
        `
            <div class="row-${i%2 + 1}">
        `;

        for (j = 0; j < directory_data.column_row.length; j++) {
            if (index < directory_data.rows.length) {
                result += `
                    <div class="col">
                        <h1>${directory_data.rows[index][j]}</h1>
                    </div>
                `;
            } else {
                result += `
                    <div class="col">
                        <h1>\t</h1>
                    </div>
                `;
            }
            
        }
        
        result += 
        `
            </div>
        `;
    }

    result += `
        <button class="btn btn-primary" type="button" onclick="page_change(-1)">&#9665;</button>
        <button class="btn btn-primary" type="button" onclick="page_change(1)">&#9655;</button>
    `;

    return result;
}
function get_news_HTML() {
    result = `
        <rssapp-list id="mObA35s7fR1nvgeg"></rssapp-list><script src="https://widget.rss.app/v1/list.js" type="text/javascript" async></script>
    `;
    return result;
}

function get_weather_icon_code(id) {
    var icon = "";
    switch (id) {
        // Thunderstorm
        case "2":
            icon = "11d";
            break;
        // Drizzle
        case "3":
            icon = "09d";
            break;
        // Rain
        case "5":
            icon = "10d";
            break;
        // Snow
        case "6":
            icon = "13d";
            break;
        // Atmosphere
        case "7":
            icon = "50d";
            break;
        // Clouds
        case "8":
            icon = "02d";
            break;
        default:
            icon = "01d";
            break;
    }
    if (d.weather_id == 800) {
        icon = "01d";
    }
    return icon;
}

function set_weather_HTML() {
    get_coord("london", function (coord) {
        get_weather(coord, function (data) {
        // get_weather("San Francisco", function (data) {
            var result = ``;
            
            var d = data[0];
            d.icon = get_weather_icon_code(d.weather_id.toString()[0]);
            result += `
                <div class="weather-div">
                    <div class="card text-white bg-secondary mb-3" style="max-width: 60%; min-width: 60%;">
                    
                        <div class="card-header" style="">
                            <h1>Tomorrow, ${d.day}, ${d.month}/${d.date}</h1>
                        </div>
                        <div class="card-body">
                            <div class="weather-card-div">
                                <img src="https://openweathermap.org/img/wn/${d.icon}@2x.png" style="width:30%; height: auto;"></img>
                                <div>
                                    <br>
                                    <h1 class="card-title">${d.weather}</h1>
                                    <h3 class="card-text">${d.description}</h3>
                                </div>
                            </div>
                            <br>
                            <h2 class="card-text">Chance of rain: ${d.pop*100}%</h3>
                            <br>
                            <br>
                            <br>
                            <h2 class="card-text">Max temperature: ${d.max_temp}&degF</h3>
                            <h2 class="card-text">Min temperature: ${d.min_temp}&degF</h3>
                            <br>
                            <h2 class="card-text">Humidity: ${d.humidity}%</h3>
                        </div>
                    </div>

                    <div>
            `;
            
            for (i = 1; i < data.length; i++) {
                var d = data[i];
                d.icon = get_weather_icon_code(d.weather_id.toString()[0]);
                result += `
                    <div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
                    
                        <div class="card-header" style="">
                            <h5>${d.day}, ${d.month}/${d.date}</h5>
                        </div>
                        
                        <div class="card-body">
                            <div class="weather-card-div">
                                <img src="https://openweathermap.org/img/wn/${d.icon}@2x.png" style="width:30%; height: auto;"></img>
                                <div>
                                    <h5 class="card-title">${d.weather}</h5>
                                    <p class="card-text">${d.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }

            result += `
                    </div>
                </div>
            `;

            // result += 
            //     `
            //         <div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
            //         <div class="card-header" style="font">${d.day}</div>
            //         <div class="card-body">
            //             <img src="https://openweathermap.org/img/wn/${icon}@2x.png"></img>
            //             <h5 class="card-title">${d.weather}</h5>
            //             <p class="card-text">${d.description}</p>
            //         </div>
            //         </div>
            //     `;
            document.getElementById("content-placeholder").innerHTML = result;
        });
    });
}

function page_change(i) {
    directory_page += i;
    render_content();
}

function change_curr_status(x) {
    curr_status = x;
    if (x == dir_status.directory) {
        directory_page = 0;
    }
    render_content();
}

function get_coord(city, f) {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${OPEN_WEATHER_API_KEY}`
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        f({
            'lat': data[0].lat,
            'lon': data[0].lon
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

function refine_weather_data(data) {
    result = [];
    var tomorrow = "";
    var pop = 0;
    var min_temp = 10000;
    var max_temp = 0;
    var tomorrow_temp = {};
    var is_tomorrow_set = false;
    for (i = 0; i < data.list.length; i++) {
        d = data.list[i];
        var temp = d.dt_txt.split(" ");
        var day_t = new Date(d.dt_txt).getDay();
        const DAYS_OF_WEEK = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ]
        var day = DAYS_OF_WEEK[day_t];
        // console.log(d);

        var date_t = temp[0].split("-");
        var time = temp[1];

        if(!is_tomorrow_set && time == "00:00:00") {
            is_tomorrow_set = true;
            tomorrow = temp[0];
        }

        var result_temp = {
            "year": date_t[0],
            "month": date_t[1],
            "date": date_t[2],
            "day": day,
            "time": time,
            "weather_id": d.weather[0].id,
            "icon": d.weather[0].icon,
            "weather": d.weather[0].main,
            "description": d.weather[0].description,
            "pop": d.pop,
            "max_temp": -999,
            "min_temp": -999,
            "humidity": d.main.humidity,
        }
        if (temp[0] == tomorrow) {
            if (result_temp.time == "15:00:00") {
                tomorrow_temp = result_temp;
            }
            if (d.pop > pop) {
                pop = d.pop;
            }
            if (d.main.temp > max_temp) {
                max_temp = d.main.temp;
            }
            if (d.main.temp < min_temp) {
                min_temp = d.main.temp;
            }

            if (result_temp.time == "21:00:00") {
                tomorrow_temp.pop = pop;
                tomorrow_temp.max_temp = max_temp;
                tomorrow_temp.min_temp = min_temp;
                result.push(tomorrow_temp);
            }
        } else {
            if (result_temp.time == "15:00:00") {
                result.push(result_temp);
            }
        }
    }

    return result;
}

function get_weather(coord, f) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&units=imperial&appid=${OPEN_WEATHER_API_KEY}`
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        f(refine_weather_data(data));
      })
      .catch(error => {
        console.error('Error:', error);
      });
}



function testFunc() {
    // get_coord('San Francisco', function (data) {
    //     get_weather(data, function (data) {
    //         console.log(data);
    //     });
    // });
    // get_weather();
}

