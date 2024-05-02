

// var directory_data = {
//     column_row: [],
//     rows: [],
// };

var dir_status = {
    testing: -1,
    directory: 0,
    news: 1,
    traffic: 2,
    weather: 3,
    ammenities: 4,
    leasing: 5,
};
const DAYS_OF_WEEK = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];


const SLIDESHOW_TYPE = {
    IMAGE: 0,
    QR_CODE: 1,
    TEXT: 2,
};

var curr_status = dir_status.directory;
var directory_page = 0;

// this is not very good to have here, but I see low risk for having this here at the moment
// move this to server side in future
const OPEN_WEATHER_API_KEY = `94bca9a1175503686db16ec39b95265a`;
// const GOOGLE_MAP_API_KEY = 'AIzaSyAVQsG2nRYK_vGOio1LWEyuJlDJTx5n20w';

// document.getElementById('traffic-map').src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&callback=initMap`;


function render_content() {
    document.getElementById("news-div").style.display = 'none';
    document.getElementById("content-placeholder").innerHTML = "";
    document.getElementById("traffic-div").style.display = 'none';
    auto_counter = -1;

    if (curr_status == dir_status.testing) {
        document.getElementById("title").innerHTML = "Testing";
        set_testing_HTML();
    } else if (curr_status == dir_status.directory) {
        document.getElementById("title").innerHTML = "Directory";
        document.getElementById("content-placeholder").innerHTML = get_directory_HTML();
    } else if (curr_status == dir_status.news) {
        document.getElementById("title").innerHTML = "News";
        document.getElementById("news-div").style.display = 'block';
    } else if (curr_status == dir_status.weather) {
        document.getElementById("title").innerHTML = "Weather";
        set_weather_HTML();
    } else if (curr_status == dir_status.traffic) {
        document.getElementById("title").innerHTML = "Local Traffic";
        initMap();
        document.getElementById("traffic-div").style.display = 'block';
    } else if (curr_status == dir_status.ammenities) {
        document.getElementById("title").innerHTML = "Ammenities";
        set_slideshow_HTML("ammenities");
    } else if (curr_status == dir_status.leasing) {
        document.getElementById("title").innerHTML = "Leasing";
        set_slideshow_HTML("leasing");
    }
    else {

        
    }
}

function set_testing_HTML() {

    // // pictures = ["sample1.jpg", "sample2.jpg", "sample3.jpg"];
    
    // var pictures = [
    //     "sample3.jpg",
    //     "sample2.jpg",
    //     "sample1.jpg",
    //     "sample4.png",
    //     "sample2.jpg",
    //     "sample5.png",
    //     "sample4.png",
    //     "sample5.png",
    //     "sample1.jpg",
    //     "sample2.jpg",
    //     "sample3.jpg",
    //     "sample4.png",
    //     "sample1.jpg",
    //     "sample3.jpg",
    //     "sample1.jpg",
    //     "sample5.png",
    //     "sample2.jpg",
    //     "sample3.jpg",
    // ];
    

    // var result = `
    //     <section class="image-grid">
    //         <div class="container-xxl">
    //             <div class="row gy-4">
    // `;

    // var t = 0;
    // var i = 0;
    // while (t < 3) {
    //     result += `
    //                 <div class="col-12 col-sm-6 col-md-4">
    //     `;
    //     var end_cond = pictures.length * (t+1) / 3;
    //     if (t == 2) {
    //         end_cond = pictures.length;
    //     }
    //     while (i < end_cond) {
    //         result += `
    //                         <figure>
    //                         <div class="d-block" href="">
    //                             <img width="1920" height="1280" src="${pictures[i]}" class="img-fluid">
    //                         </div>
    //                         </figure>
    //         `;
    //         i++;
    //     }
    //     result += `
    //                 </div>
    //     `;

    //     t++;
    // }
    // result += `
    //             <!-- more columns here -->
    //             </div>
    //         </div>
    //     </section>
    // `;

    // //result reset
    // // result = ``;

    // // result += `
    // //     <div>
    // // `;
    // // i = 0;
    // // while (i < 3) {
    // //     result += `
    // //         <div class="modal fade" id="slideshow_modal_${i}" tabindex="-1" role="dialog">
    // //             <div class="modal-dialog" role="document">
    // //                 <div class="modal-content">
    // //                     <div class="modal-header">
    // //                         <h5 class="modal-title">Edit description</h5>
    // //                         <button type="button" class="close" onclick="" data-dismiss="modal" aria-label="Close">
    // //                         <span aria-hidden="true">&times;</span>
    // //                         </button>
    // //                     </div>
    // //                     <div class="modal-body">
    // //                         <p>test</p>
    // //                     </div>
    // //                     <div class="modal-footer">
    // //                         <button type="button" class="btn btn-secondary" onclick="" data-dismiss="modal">Close</button>
    // //                     </div>
    // //                 </div>
    // //             </div>
    // //         </div>
    // //     `;
    // //     i++;
    // // }
    // // result += `
    // //     </div>
    // // `;


    // result = ``;
    // result += `
    //     <div>
    //         <div class="carousel" style="max-height: 70vh">
    //             <div class="prev-arrow"></div>

    //             <div class="carousel-sections-scroll" style="max-height: 70vh">
    //                 <div class="carousel-sections" style="max-height: 70vh">
    // `;
    
    // i = 0;
    // while (i < 3) {
    //     result += `
    //         <div class="carousel-section" style="max-height: 70vh">
                
    //             <div class="card" style="width: 18rem; margin: 5px">
    //                 <img class="card-img-top" src="sample1.jpg" alt="Card image cap">
    //                 <div class="card-body">
    //                     <h5 class="card-title">Ammenity name</h5>
    //                     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //                     <button class="btn btn-primary" data-toggle="modal" data-target="#slideshow_modal_${i}"> More info </button>

    //                 </div>
    //             </div>

    //             <div class="card" style="width: 18rem; margin: 5px">
    //             <img class="card-img-top" src="sample1.jpg" alt="Card image cap">
    //             <div class="card-body">
    //                 <h5 class="card-title">Ammenity name</h5>
    //                 <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //                 <button class="btn btn-primary" data-toggle="modal" data-target="#slideshow_modal_${i}"> More info </button>

    //             </div>
    //         </div>
            
    //         <div class="card" style="width: 18rem; margin: 5px">
    //         <img class="card-img-top" src="sample1.jpg" alt="Card image cap">
    //         <div class="card-body">
    //             <h5 class="card-title">Ammenity name</h5>
    //             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //             <button class="btn btn-primary" data-toggle="modal" data-target="#slideshow_modal_${i}"> More info </button>

    //         </div>
    //     </div>

    //         </div>
            
    //     `;
    //     i++;
    // }

    // result += `
    //                 </div>
    //             </div>
                
    //             <div class="next-arrow"></div>
        
    //         </div>
    //         <div class="carousel-dots">
    // `;
    // i = 0;
    // while (i < 3) {
    //     result += `<div class="carousel-dot"></div>`;
    //     i++;
    // }

    // result += `
    //         </div>
    //     </div>
    // `;


    
    // document.getElementById("content-placeholder").innerHTML = result;
    // init_slide();

    // var iframe = `<iframe id="gallery" src="gallery.html" title="description" style="width: 70vw; height: 70vh;"></iframe>`;

    // document.getElementById("content-placeholder").innerHTML = iframe;

    result = `
        <div class="card" style="width: 25vw; max-height: 70vh; margin: 5px">
            <div style="height:40vh; background-color: grey; display: flex; align-items: center; justify-content: center;">
                <div id="qrcode" class="qr-code-div">
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title">test</h5>
                <p class="card-text">test</p>
            </div>
        </div>
    `;
    document.getElementById("content-placeholder").innerHTML = result;

    new QRCode(document.getElementById(`qrcode`), {
        text: `https://google.com`,
    });
    // document.getElementById(`qrcode`).getElementsByTagName("img")[0].style.margin = "auto";


}

function get_directory_HTML() {
    result = `
        <div class="directory-div">
    `;

    // for (const c in directory_data.column_row) {
    //     result += 
    //     `
    //         <div class="col">
    //             <h1>${directory_data.column_row[c]}</h1>
    //         </div>
    //     `;
    // }
    // result += 
    // `
    //     </div>
    // `;

    // for (const c in directory_data.column_row) {
    for (var c = 0; c < directory_data.column_row.length; c++) {
        var col_size = directory_data.column_size[c];
        if (col_size == '') {
            col_size = 1;
        } else {
            col_size = Number(col_size);
        }


        // var col_size = 1;

        result += `
            <div class="col" style="padding: 0px; flex-grow:${col_size}">

                <div class="col-bar">
                    <h1>${directory_data.column_row[c]}</h1>
                </div>
        `;

        for (i = 0; i < directory_data.rows.length + (10 - directory_data.rows.length%10); i++) {
            index = directory_page*10 + i;
            var row_style = `display: none;`;
            if (directory_page*10 <= i && i < (directory_page+1)*10) {
                row_style = ``;
            }

            result += 
            `
                <div class="row-${i%2 + 1}" style="${row_style}">
            `;

            if (i < directory_data.rows.length) {

                if (directory_data.rows[i][c].length > 30) {
                    result += 
                    `
                        <h1 style="font-size: 22px;">${directory_data.rows[i][c]}</h1>
                    `;

                } else {
                    result += `
                        <h1>${directory_data.rows[i][c]}</h1>
                    `;
                }

                // if (directory_data.rows[index][c].length > 30) {
                //     var s = directory_data.rows[index][c];
                    
                //     var temp_index = 0;

                //     if (s.length < 40) {
                //         temp_index = s.length;
                //     } else {
                //         var temp = s.substr(0, 30);
                //         temp_index = temp.lastIndexOf(" ");
                //         if (temp_index == -1) {
                //             temp_index = 35;
                //         }
                //     }
                    
                //     result += 
                //     `
                //         <h1 style="font-size: 22px; margin-bottom: 0">${s.substr(0, temp_index)}</h1>
                //         <h1 style="font-size: 22px;">${s.substr(temp_index)}</h1>
                //     `;

                // } else {
                //     result += `
                //         <h1>${directory_data.rows[index][c]}</h1>
                //     `;
                // }

            }
            
            result += `
                </div>
            `;
        }
        
        result += `
            </div>
        `;
    }
    

    result += `
        </div>
        <div class="directory-btn-div">
            <button class="btn btn-primary" type="button" style="width: 7vw; height: 5vh;" onclick="page_change(-1)">&#9665;</button>
            <div>
                <h1>${directory_page+1}</h1>
            </div>
            <button class="btn btn-primary" type="button" style="width: 7vw; height: 5vh;" onclick="page_change(1)">&#9655;</button>
        </div>
    `;

    return result;
}

function set_slideshow_HTML(menu_name) {
    result = `
        <div>
            <div class="carousel" style="max-height: 70vh">

                <div class="carousel-sections-scroll" style="max-height: 70vh">
                    <div class="carousel-sections" style="max-height: 70vh">
    `;

    qrcode_queue = [];
    
    i = 0;
    while (i < directory_data[menu_name].length) {
        
        result += `
            <div class="carousel-section" style="max-height: 70vh">
        `;
        j = 0;
        while (j < directory_data[menu_name][i].files.length) {
            file = directory_data[menu_name][i].files[j];

            if (file.type == SLIDESHOW_TYPE.IMAGE) {
                result += `
                        <div class="card" style="width: 25vw; max-height: 70vh; margin: 5px">
                            <div style="height:40vh; background-color: grey">
                                <img class="card-img-top" src="${file.name}" alt="Card image cap" style="max-height: 100%; object-fit: contain;">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${file.title}</h5>
                                <p class="card-text">${file.description.replaceAll("\n", "<br>")}</p>
                            </div>
                        </div>
                `;
            } else if (file.type == SLIDESHOW_TYPE.QR_CODE) {
                
                // width: 240,
                // height: 240,
                result += `
                        <div class="card" style="width: 25vw; max-height: 70vh; margin: 5px">
                            <div style="height:40vh; background-color: grey; display: flex; align-items: center; justify-content: center;">
                                <div id="qrcode_${i}_${j}" class="qr-code-div"></div>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${file.title}</h5>
                                <p class="card-text">${file.description.replaceAll("\n", "<br>")}</p>
                            </div>
                        </div>
                `;
                qrcode_queue.push([menu_name, i, j]);
            }
            j++
        }
        // <img src="${directory_data[menu_name][i].name}" style="max-width:100%; max-width: 60vw;">
        // <div class="card text-white bg-secondary mb-3" style="width:20vw; opacity: .8; position: absolute; top: 5%; left: ${70*i + 45}vw;">
        //     <div class="card-header"><h5 class="card-title">${directory_data[menu_name][i].title}</h5></div>
        //     <div class="card-body" style="text-align: left">
        //         <p id="slideshow_text_${i}">${directory_data[menu_name][i].description}</p>
        //     </div>
        // </div>
        result += `
            </div>
        `;
        i++;
    }


    
/* <div class="carousel-details" style="max-height: 40vh; width:25vw; margin: 10px;">
<h5>${directory_data[menu_name][i].title}</h5>
<div style="text-align: left">
    <p>${directory_data[menu_name][i].description}</p>
</div>
</div> */


    result += `
                    </div>
                </div>
        
            </div>

            <div class="carousel-btn-div">
                <button id="carousel_prev" class="btn btn-primary" type="button" style="width: 7vw; height: 5vh;">&#9665;</button>
                <button id="carousel_next" class="btn btn-primary" type="button" style="width: 7vw; height: 5vh;">&#9655;</button>
            </div>


            <div class="carousel-dots">
    `;
    i = 0;
    while (i < directory_data[menu_name].length) {
        result += `<div class="carousel-dot"></div>`;
        i++;
    }

    result += `
            </div>
        </div>
    `;


    result += `
        <script>
            
        </script>

    `;


    
    document.getElementById("content-placeholder").innerHTML = result;

    for (const index in qrcode_queue) {
        var menu_name = qrcode_queue[index][0];
        var i = qrcode_queue[index][1];
        var j = qrcode_queue[index][2];
        new QRCode(document.getElementById(`qrcode_${i}_${j}`), {
            text: `${directory_data[menu_name][i].files[j].url}`,
        });
        // document.getElementById(`qrcode_${i}_${j}`).getElementsByTagName("img")[0].style.margin = "auto";
    }


    init_slide();
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
    get_today_weather(directory_data.setting.coord, function (today_data) {
        get_weather(coord, function (data) {
        // get_weather("San Francisco", function (data) {
            var result = ``;
            var d = data[0];
            d.icon = get_weather_icon_code(d.weather_id.toString()[0]);
            today_data.icon = get_weather_icon_code(today_data.weather_id.toString()[0]);
            
            result += `
                <div class="weather-div" style="margin-top: 10px">
                    <div style="max-width: 60%; min-width: 60%;">

                        <div class="card text-white bg-secondary mb-3" style=""; height: 12%">
                            <div class="card-header" style="">
                                <h4>Today, ${today_data.day}, ${today_data.month}/${today_data.date}</h4>
                            </div>

                            <div class="card-body">
                                <div class="weather-card-div">
                                    <img src="https://openweathermap.org/img/wn/${today_data.icon}@2x.png" style="width:20%; height: 20%;"></img>
                                    <div>
                                        <h2>${today_data.weather}</h2>
                                        <h4>${today_data.description}</h4>
                                    </div>
                                    <div style="margin-top: 5%">
                                        <p>
                                            Temperature:<br>
                                            ${today_data.min_temp}&degF~${today_data.max_temp}&degF
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="card text-white bg-secondary mb-3" style="">
                            <div class="card-header" style="">
                                <h2>Tomorrow, ${d.day}, ${d.month}/${d.date}</h2>
                            </div>
                            <div class="card-body">
                                <div class="weather-card-div">
                                    <img src="https://openweathermap.org/img/wn/${d.icon}@2x.png" style="width:25%; height: auto;"></img>
                                    <div>
                                        <br>
                                        <h1 class="card-title">${d.weather}</h1>
                                        <h3 class="card-text">${d.description}</h3>
                                    </div>
                                </div>
                                <br>
                                <h2 class="card-text">Chance of rain: ${d.pop*100}%</h3>
                                <h2 class="card-text">Max temperature: ${d.max_temp}&degF</h3>
                                <h2 class="card-text">Min temperature: ${d.min_temp}&degF</h3>
                                <h2 class="card-text">Humidity: ${d.humidity}%</h3>
                            </div>
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
    });//get today weather
}

function page_change(i) {
    directory_page += i;
    if (directory_page < 0) {
        directory_page = Math.floor(directory_data.rows.length / 10);
    }
    if (directory_page > Math.floor(directory_data.rows.length / 10)) {
        directory_page = 0;
    }

    user_action();
    render_content();
}

function change_curr_status(x) {
    curr_status = x;
    if (x == dir_status.directory) {
        directory_page = 0;
    }
    user_action();
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
        console.log(data[0].lat)
        console.log(data[0].lon)
        f({
            'lat': parseInt(data[0].lat),
            'lon': parseInt(data[0].lon),
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

function get_tomorrow() {
    const d = new Date();
    var offset = -6
    
    // to be implemented
    var summer_time = true;
    if (summer_time) {
        offset = -7
    }

    d.setTime(d.getTime() + offset * 60000 * 60);
    d.setDate(d.getDate()+1);
    return d.toJSON().slice(0, 10);
}


function get_today_date() {
    const d = new Date();
    var offset = -6
    
    // to be implemented
    var summer_time = true;
    if (summer_time) {
        offset = -7
    }

    d.setTime(d.getTime() + offset * 60000 * 60);
    return d;
}

function set_today_weather_icon() {
    get_today_weather(directory_data.setting.coord, function (data) {
        console.log('weather icon')
        var icon = get_weather_icon_code(data.weather_id.toString()[0]);
    
        document.getElementById('weather_icon_div').innerHTML = `
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
        `;
    });
}

function refine_today_weather_data(d) {
    var today_date = get_today_date();
    
    var result = {
        "year": today_date.getFullYear(),
        "month": today_date.getMonth()+1,
        "date": today_date.getDate(),
        "day": DAYS_OF_WEEK[today_date.getDay()],
        "weather_id": d.weather[0].id,
        "icon": d.weather[0].icon,
        "weather": d.weather[0].main,
        "description": d.weather[0].description,
        "pop": d.pop,
        "max_temp": d.main.temp_max,
        "min_temp": d.main.temp_min,
        "humidity": d.main.humidity,
    }
    console.log(result);
    return result;
}




function refine_weather_data(data) {
    result = [];
    var tomorrow = get_tomorrow();
    var pop = 0;
    var min_temp = 10000;
    var max_temp = 0;
    var tomorrow_temp = {};

    for (i = 0; i < data.list.length; i++) {
        d = data.list[i];
        var temp = d.dt_txt.split(" ");
        var day_t = new Date(d.dt_txt).getDay();
       
        var day = DAYS_OF_WEEK[day_t];
        // console.log(d);

        var date_t = temp[0].split("-");
        var time = temp[1];

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
            // console.log(tomorrow_temp)
            
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

function get_today_weather(coord, f) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&units=imperial&appid=${OPEN_WEATHER_API_KEY}`
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        f(refine_today_weather_data(data));
      })
      .catch(error => {
        console.error('Error:', error);
      });
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
        f(refine_weather_data(data));
      })
      .catch(error => {
        console.error('Error:', error);
      });
}


// A simple vanilla JS clock

// Initilize variables for date, hour, minute, second, am or pm, and the final displayed time
var d, h, m, s, ampm, time;

// Your clock!
function displayTime() {
  d = new Date();

  d.setHours(d.getHours());

  days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  day = days[d.getDay()];
  month = d.getMonth()+1;
  date = d.getDate();
  year = d.getFullYear();

  h = d.getHours();
  m = d.getMinutes();
  s = d.getSeconds();
  ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12;
  if (h == 0) {
    h = 12;
  }

  // Adds zeros to single digit times
  if (h <= 9) {
    h = '0' + h;
  }
  if (m <= 9) {
    m = '0' + m;
  }
  if (s <= 9) {
    s = '0' + s;
  }

  // Assign time format to variable. If you want to change how time is displayed do it here
  // Example time = h + ":" + m;
  time = h + ":" + m + ":" + s + " " + ampm;

  // Print your clock to an element.
  document.getElementsByClassName("time")[0].innerHTML = `<h1 style="font-size: 3vw">${time}</h1>`;
  document.getElementsByClassName("day")[0].innerHTML = `<h1 style="">${day}</h1>`;
  document.getElementsByClassName("date")[0].innerHTML = `<h1 style="">${month}/${date}/${year}</h1>`;
  // document.getElementsByClassName("date-day")[0].innerHTML = month + "/" + date + "/" + year + ", " + day;

  // Refreshes clock every second. If you're just using minutes change to 60000
  setTimeout(displayTime, 1000);
}

// code below moved to onLoad
// Run your baller clock!
// displayTime();

prevBtn = null;
nextBtn = null;
sectionContainer = null;


let currentIndex = 0;
let slides = [];
let dots = [];

const AUTO_COUNTER_INIT = 6;
let auto_counter = -1;

function render_carousel() {
    let offset = 0;
    slides.forEach((slide, index) => {
        if (index < currentIndex) {
        offset += slide.offsetWidth;
        }
    });

    sectionContainer.style.transform = `translateX(-${offset}px)`;
    dots.forEach((dot, index) => {
        index === currentIndex
        ? dot.classList.add("active")
        : dot.classList.remove("active");
    });
}

function manual_prev() {
    auto_counter = AUTO_COUNTER_INIT;
    prev();
    user_action();
}
function manual_next() {
    auto_counter = AUTO_COUNTER_INIT;
    next();
    user_action();
}

function prev() {
    if (currentIndex <= 0) {
        currentIndex = slides.length;
    };
    currentIndex -= 1;
    render_carousel();
}

function next() {
    if (currentIndex === slides.length - 1) {
        currentIndex = -1;
    };
    currentIndex += 1;
    render_carousel();
}

function goto(newIndex) {
    if (newIndex < 0 || newIndex > slides.length - 1) return;
    currentIndex = newIndex;
    auto_counter = AUTO_COUNTER_INIT;
    render_carousel();
}

function carousel_timer() {
    console.log(`carousel timer`);
    if (auto_counter > 0) {
        auto_counter--;
    } else if (auto_counter == -1) {
        //do nothing
    } else {
        next();
    }
    
    setTimeout(carousel_timer, 5000);
}

function init_slide() {
    currentIndex = 0;
    
    prevBtn = document.getElementById("carousel_prev");
    nextBtn = document.getElementById("carousel_next");

    // prevBtn = document.querySelector("div.prev-arrow");
    // nextBtn = document.querySelector("div.next-arrow");
    sectionContainer = document.querySelector("div.carousel-sections");

    prevBtn.onclick = manual_prev;
    nextBtn.onclick = manual_next;


    const newSlides = document.querySelectorAll("div.carousel-sections > div");
    slides = newSlides;

    const newDots = document.querySelectorAll("div.carousel-dots > div");
    newDots.forEach((dot, index) => {
        dot.onclick = () => goto(index);
    });
    dots = newDots;

    auto_counter = 0;
    render_carousel();
}

var last_user_action = Number(new Date());
const INACTIVITY_TIME = 60000;

function user_action() {
    console.log("user action");
    last_user_action = Number(new Date());
}

function check_user_actiivity() {
    var curr_time = Number(new Date());
    if (last_user_action + INACTIVITY_TIME < curr_time) {
        change_curr_status(dir_status.directory);
    }
    setTimeout(check_user_actiivity, 30000);
}

function testFunc() {
    // get_coord('San Francisco', function (data) {
    //     get_weather(data, function (data) {
    //         console.log(data);
    //     });
    // });
    // get_weather();
}

