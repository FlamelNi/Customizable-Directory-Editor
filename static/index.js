

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

function render_content() {
    document.getElementById("news-div").style.display = 'none';
    document.getElementById("content-placeholder").innerHTML = "";
    
    if (curr_status == dir_status.directory) {
        document.getElementById("title").innerHTML = "Directory";
        document.getElementById("content-placeholder").innerHTML = get_directory_HTML();
    } else if (curr_status == dir_status.news) {
        document.getElementById("title").innerHTML = "News";
        document.getElementById("news-div").style.display = 'block';
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



function testFunc() {
    alert();
    console.log(directory_data);
}

