var previous_directory_data = null;

const CURR_VERSION = {
    "id": "1.1.2",
    "date": "05/01/2024",
};


var directory_data = reset_data();

const SLIDESHOW_TYPE = {
    IMAGE: 0,
    QR_CODE: 1,
    TEXT: 2,
};

const ALL_EDITORS = {
    DIRECTORY: 0,
    AMMENITIES: 1,
    LEASING: 2,
};

SLIDESHOW_FIELD_NAME = {};

SLIDESHOW_FIELD_NAME[ALL_EDITORS.AMMENITIES] = "ammenities";
SLIDESHOW_FIELD_NAME[ALL_EDITORS.LEASING] = "leasing";

var curr_editor = ALL_EDITORS.DIRECTORY;

var temp_image = null;
var t = 'hello';

function testFunction() {
    read_HTML_to_update();
    console.log(directory_data);
    // console.log(directory_data.rows);
    // console.log(JSON.stringify(directory_data));

    // getTxt = function (){
    //     $.ajax({
    //         // url:'/js/index.js',
    //         url:'template/index.html',
    //         success: function (data){
    //             console.log(data);
    //             //parse your data here
    //             //you can split into lines using data.split('\n') 
    //             //an use regex functions to effectively parse it

    //             let new_element = document.createRange()
    //             .createContextualFragment(data);

    //             document.body.appendChild(new_element);

    //         }
    //     });
    // }
    // getTxt();
}




function reset_data() {
    var temp = empty_data();
    temp.column_row = ['Col 1', 'Col 2'];
    temp.column_size = ["", ""];
    return JSON.parse(JSON.stringify(temp));
}
function empty_data() {
    var temp = {
        column_row: [],
        column_size: [],
    
        /*
        rows: [
            ['', ''],
            ['', ''],
        ],
        */
        rows: [],
        // rows: [
        //     ['ad', 'ry'],
        //     ['adf', 'wer'],
        // ],

        last_change_date: null,
        version: CURR_VERSION,
        setting: {
            greeting_1: "",
            greeting_2: "",
            coord: {
                lat: "",
                lon: "",
            }
        }
    };
    return JSON.parse(JSON.stringify(temp));
}

function set_test_data() {
    directory_data = reset_data();
    directory_data.rows.push(["1111", "2222"]);
    directory_data.rows.push(["3333", "4444"]);
    directory_data.rows.push(["5555", "6666"]);
    directory_data.rows.push(["asdf", "zxcv"]);
    directory_data.rows.push(["qwer", "uiop"]);
    directory_data.rows.push(["hjkl", "vbnm"]);
    directory_data.rows.push(["897987", "34535"]);
    directory_data.rows.push(["tgbredc", "jumui"]);
    directory_data.rows.push(["alpha", "beta"]);
    directory_data.rows.push(["gamma", "delta"]);
    directory_data.rows.push(["seta", "psi"]);

    render_editor();
}

function get_HTML_column(i) {
    col = directory_data.column_row[i];
    col_size = directory_data.column_size[i];
    result = 
    `
        <div class="col">
            <div id="${i}" class="col-function-row col" style="margin-bottom: 5px;">
                <button class="btn btn-primary" type="button" style="flex-grow: 0.2;" onclick="swap_col(${i}, ${i-1})">&#9665;</button>
                <div style="flex-basis: 15px;"></div>
                <button class="btn btn-warning" type="button" style="" onclick="sort_col(${i})">Sort</button>
                <div style="flex-basis: 15px;"></div>
                <button class="btn btn-primary" type="button" style="flex-grow: 0.2" onclick="swap_col(${i}, ${i+1})">&#9655;</button>
            </div>
            
            <input id="col_${i}" class="form-control col" type="text" placeholder="column name" value="${col}">
            <input id="col_size_${i}" class="form-control col" type="text" placeholder="1" value="${col_size}">
        </div>
    `;

    return result;
}

function get_HTML_column_row() {
    result = 
    `
        <div style="">
            <div class="input-row">
                <div class="d-grid gap-2" style="min-width: 160px; max-width: 160px;">
                    <h4>Control</h4>
                    <h4>Column Name</h4>
                    <h4>Column size</h4>
                </div>
    `;


    for (i = 0; i < directory_data.column_row.length; i++) {
        result += get_HTML_column(i);
    }
    result += 
    `
            </div>
        </div>
    `;

    return result;
}

function get_HTML_row(i) {
    row = directory_data.rows[i];
    result = 
    `
        <div style="">
            <div class="input-row">
                <div class="row-function-col" style="min-width: 160px; max-width: 160px;">
                    <button class="btn btn-primary" style="flex-grow: 0.7" onclick="new_row_at(${i+1})"> Insert </button>
                    <button class="btn btn-danger" style="flex-grow: 0.7" onclick="delete_row_at(${i})"> Delete </button>
                </div>
    `;
    
    for (j = 0; j < directory_data.column_row.length; j++) {
        col = directory_data.column_row[j];
        //row_{#col}_{#row}
        result +=
        `
            <div class="col">
                <input id="row_${j}_${i}" class="form-control col" type="text" placeholder="${col} entry" value="${row[j]}">
            </div>
        `;
    }
    result +=
    `
            </div>
        </div>
    `;

    return result;
}

function get_HTML_all_rows() {
    result = ``;
    for (i = 0; i < directory_data.rows.length; i++) {
        result += get_HTML_row(i);
    }
    return result;
}

function render_editor_directory() {
    result = 
    `
        <div class="row-column-menu">
            <button class="btn btn-primary" style="flex-grow: 0.7; margin-right: 30px;" onclick="new_row_at(0)"> Add new row </button>
            <button class="btn btn-primary" style="flex-grow: 0.7" onclick="add_col()"> Add new column </button>
            <button class="btn btn-danger" style="flex-grow: 0.7;" onclick="delete_col()"> Delete last column </button>
            <button class="btn btn-secondary" style="flex-grow: 0.7; margin-left: 300px;" onclick="testFunction()"> Test </button>
            <button class="btn btn-secondary" style="flex-grow: 0.7;" onclick="set_test_data()"> Test data </button>
        </div>

        <div id="render_div">
        </div>
    `;
    
    document.getElementById("editor_div").innerHTML = result;
    
    result = ``;
    result += get_HTML_column_row();
    result += get_HTML_all_rows();
    document.getElementById("render_div").innerHTML = result;
}

function new_slideshow_section(menu_name) {
    read_HTML_to_update();
    directory_data[menu_name].push({
        "section_name": "new section",
        "files": [],
    });
    render_editor();
}


function new_slideshow_entry(menu_name, i) {
    read_HTML_to_update();
    directory_data[menu_name][i].files.push({
        title: "New picture",
        description: "",
        name: "no file selected",
        data: null,
        type: SLIDESHOW_TYPE.IMAGE,
    });
    render_editor();
}

function new_slideshow_QR(menu_name, i) {
    read_HTML_to_update();
    directory_data[menu_name][i].files.push({
        title: "New QR code",
        description: "",
        url: "",
        name: "no file selected",
        data: null,
        type: SLIDESHOW_TYPE.QR_CODE,
    });
    render_editor();
}

function delete_slideshow_section(menu_name, section_i) {
    read_HTML_to_update();
    directory_data[menu_name].splice(section_i, 1);
    render_editor();
}

function delete_slideshow_entry(menu_name, section_i, i) {
    read_HTML_to_update();
    directory_data[menu_name][section_i].files.splice(i, 1);
    render_editor();
}

function render_editor_slideshow(menu_name) {
    if (directory_data[menu_name] == undefined) {
        directory_data[menu_name] = [];
    }
    result = ``;
    result += `
        <div class="row-column-menu">
            <button class="btn btn-primary" style="flex-grow: 0.7; margin-right: 30px;" onclick="new_slideshow_section('${menu_name}')"> Add new section </button>
        </div>

        <div>
    `;
    var section_i = 0
    while (section_i < directory_data[menu_name].length) {
        // result += `
        //     <div id="slideshow_section_div_${section_i}">
        // `;
        result += get_render_editor_slideshow_section(menu_name, section_i);
        section_i++;
    }
    result += `
        </div>
    `;

    var editor_div = document.getElementById("editor_div")
    editor_div.innerHTML = result;

    i = 0;
    while (i < directory_data[menu_name].length) {
        j = 0;
        while (j < directory_data[menu_name][i].files.length) {
            imageSelector = document.getElementById(`image-selector_${i}_${j}`);
            if (imageSelector) {
                imageSelector.addEventListener('change', (event) => {
                    const fileList = event.target.files;
                    temp_image = fileList[0];
                });
            }
            j++;
        }
        i++;
    }


}
function get_render_editor_slideshow_section(menu_name, section_i) {
    result = ``;
    result += `
        <div style="background-color: Grey">
            <button class="btn btn-primary" style="flex-grow: 0.7; margin-right: 30px;" onclick="new_slideshow_entry('${menu_name}', ${section_i})"> Add new image </button>
            <button class="btn btn-primary" style="flex-grow: 0.7; margin-right: 30px;" onclick="new_slideshow_QR('${menu_name}', ${section_i})"> Add new QR code </button>
            <button class="btn btn-danger" style="flex-grow: 0.7; margin-right: 30px;" onclick="delete_slideshow_section('${menu_name}', ${section_i})"> Delete this section </button>
            <h3>${directory_data[menu_name][section_i].section_name}</h3>
        </div>

        <div>
    `;
    //todo-----------------------------------------------------------------

    if (directory_data[menu_name] == undefined) {
        directory_data[menu_name] = [];
    }
    if (directory_data[menu_name][section_i] == undefined) {
        directory_data[menu_name][section_i] = {
            "section_name": "",
            "files": [],
        };
        /*
        {
            name: "",
            title: "",
            description: "",
            data: "",
        }
        */
    }
    
    i = 0;
    var files = directory_data[menu_name][section_i].files;
    while (i < files.length) {
        result += get_slideshow_modal_HTML(menu_name, section_i, i);
        i++;
    }

    result += `
        </div>
    `;
    return result;
}

function get_slideshow_modal_HTML(menu_name, section_i, i) {
    var files = directory_data[menu_name][section_i].files;
    result = `
        <div class="modal fade" id="row_info_${section_i}_${i}" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit description</h5>
                        <button type="button" class="close" onclick="close_modal()" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
    `;
    result += `
                        <input id="title_${section_i}_${i}" class="form-control col" type="text" placeholder="title" value="${files[i].title}">
                        <textarea id="description_${section_i}_${i}" class="form-control col" placeholder="description">${files[i].description}</textarea>
    `;
    
    if (files[i].type == SLIDESHOW_TYPE.IMAGE) {
        // <input id="description_${i}" class="form-control col" type="text" placeholder="description" value="${directory_data[menu_name][i].description}">
        if (files[i].data == null) {
            result += `
                <input class="form-control" type="file" id="image-selector_${section_i}_${i}" placeholder="test">
            `;
        } else {
            result += `
                <div id="name_${section_i}_${i}">
                    <h4>${files[i].name}</h4>
                </div>
            `;
        }
    } else if (files[i].type == SLIDESHOW_TYPE.QR_CODE) {
        result += `
            <input id="qr_code_${section_i}_${i}" class="form-control col" type="text" placeholder="QR code url" value="${files[i].url}">
        `;
    }


    result += `
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="save_slideshow_entry('${menu_name}', ${section_i}, ${i})" data-dismiss="modal">Save changes</button>
                        <button type="button" class="btn btn-secondary" onclick="close_modal()" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="input-row">
            <button class="btn btn-warning" style="width: 80px; margin-right: 10px;" onclick="" data-toggle="modal" data-target="#row_info_${section_i}_${i}"> Edit </button>
            <button class="btn btn-danger" style="width: 80px; margin-right: 50px;" onclick="delete_slideshow_entry('${menu_name}', ${section_i}, ${i})"> Delete </button>
            <div>
                <h3>${files[i].title}</h3>
            </div>
        </div>

    `;
    return result;
}


function save_slideshow_entry(menu_name, section_i, i) {
    file = directory_data[menu_name][section_i].files[i];
    if (file.type == SLIDESHOW_TYPE.IMAGE) {
        if (temp_image != null) {
            file.title = document.getElementById(`title_${section_i}_${i}`).value;
            file.description = document.getElementById(`description_${section_i}_${i}`).value;
            
            file.data = temp_image;
            file.name = temp_image.name;
            file.is_new = true;
        } else if(file.name != undefined && file.name != "" && file.name != null) {
            file.title = document.getElementById(`title_${section_i}_${i}`).value;
            file.description = document.getElementById(`description_${section_i}_${i}`).value;
        } else {
            // files.name = "New picture";
            alert("Please upload an image file if you wish to save this entry");
        }
        temp_image = null;
    } else if (file.type == SLIDESHOW_TYPE.QR_CODE) {
        file.title = document.getElementById(`title_${section_i}_${i}`).value;
        file.description = document.getElementById(`description_${section_i}_${i}`).value;
        file.url = document.getElementById(`qr_code_${section_i}_${i}`).value;
    }

    render_editor();
}

function save_setting() {
    directory_data.setting.greeting_1 = document.getElementById("greeting_1").value;
    directory_data.setting.greeting_2 = document.getElementById("greeting_2").value;
    directory_data.setting.coord = {
        lat: document.getElementById("lat").value,
        lon: document.getElementById("lon").value,
    }
}

function render_others() {
    result = `
        <div class="modal fade" id="setting" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit description</h5>
                        <button type="button" class="close" onclick="close_modal()" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <label>Site Name</lable>
                        <input id="greeting_1" class="form-control col" type="text" placeholder="" value="${directory_data.setting.greeting_1}">
                        <input id="greeting_2" class="form-control col" type="text" placeholder="" value="${directory_data.setting.greeting_2}">
                        
                        <label>Latitude</lable>
                        <input id="lat" class="form-control col" type="text" placeholder="" value="${directory_data.setting.coord.lat}">
                        <label>Longtitude</lable>
                        <input id="lon" class="form-control col" type="text" placeholder="" value="${directory_data.setting.coord.lon}">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="save_setting()" data-dismiss="modal">Save changes</button>
                        <button type="button" class="btn btn-secondary" onclick="close_modal()" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById("setting-modal-div").innerHTML = result;
}

function close_modal() {
    temp_image = null;
    render_editor();
}

function render_editor() {
    if (curr_editor == ALL_EDITORS.DIRECTORY) {
        render_editor_directory();
    } else if (curr_editor == ALL_EDITORS.AMMENITIES) {
        render_editor_slideshow("ammenities");
    } else if (curr_editor == ALL_EDITORS.LEASING) {
        render_editor_slideshow("leasing");
    }
    else {

    }
    render_others();
}

function change_editor(x) {
    read_HTML_to_update();
    curr_editor = x;
    render_editor();
}

function read_HTML_to_update_dir() {
    for (i = 0; i < directory_data.column_row.length; i++) {
        temp = document.getElementById(`col_${i}`).value;
        directory_data.column_row[i] = temp;
        
        directory_data.column_size[i] = document.getElementById(`col_size_${i}`).value;
    }

    for (i = 0; i < directory_data.column_row.length; i++) {
        for (j = 0; j < directory_data.rows.length; j++) {
            t = document.getElementById(`row_${i}_${j}`).value;
            if (!isNaN(Number(t))) {
                t = Number(t);
            }
            directory_data.rows[j][i] = t;
        }
    }
}

function read_HTML_to_update_ammenities() {

}

function read_HTML_to_update() {
    directory_data.last_change_date = new Date();

    if (curr_editor == ALL_EDITORS.DIRECTORY) {
        read_HTML_to_update_dir();
    } else if (curr_editor == ALL_EDITORS.AMMENITIES) {
        read_HTML_to_update_ammenities();
    }
    else {

    }
}

function new_row_at(i) {
    read_HTML_to_update();
    
    directory_data.rows.splice(i, 0, []);
    for (const c in directory_data.column_row) {
        directory_data.rows[i].push("");
    }
    

    render_editor();
}

function delete_row_at(i) {
    read_HTML_to_update();

    directory_data.rows.splice(i, 1);

    render_editor();
}

function add_col() {
    read_HTML_to_update();

    directory_data.column_row.push("New Col");
    directory_data.column_size.push("");

    directory_data.rows.forEach(r => {
        r.push("");
    });

    render_editor();
}

function delete_col() {
    read_HTML_to_update();

    directory_data.column_row.pop();
    directory_data.rows.forEach(r => {
        r.pop();
    });

    render_editor();
}

function swap_col(i, j) {
    var col_size = directory_data.column_row.length;
    if (i < 0 || col_size <= i || j < 0 || col_size <= j) {
        return;
    }
    read_HTML_to_update();

    var temp = directory_data.column_row[i];
    directory_data.column_row[i] = directory_data.column_row[j];
    directory_data.column_row[j] = temp;

    temp = directory_data.column_size[i];
    directory_data.column_size[i] = directory_data.column_size[j];
    directory_data.column_size[j] = temp;

    directory_data.rows.forEach(r => {
        var temp = r[i];
            r[i] = r[j];
            r[j] = temp;
    });

    render_editor();

}

function sort_col(i) {
    read_HTML_to_update();
    directory_data.rows.sort(function (a, b) {
        if (a[i] < b[i]) {
            return -1;
        } else if (a[i] == b[i]) {
            return 0;
        } else {
            return 1;
        }
    });
    render_editor();
}

function export_directory_data(curr_zip) {
    read_HTML_to_update();

    curr_zip.file("directory", JSON.stringify(directory_data));
}

function import_image_files() {
    for (k in SLIDESHOW_FIELD_NAME) {
        const menu_name = SLIDESHOW_FIELD_NAME[k];
        if (directory_data[menu_name] != undefined) {
            
            i = 0;
            while (i < directory_data[menu_name].length) {
                j = 0;
                while (j < directory_data[menu_name][i].files.length) {
                    var data_i = directory_data[menu_name][i].files[j];
                    if (data_i != null) {
                        if (data_i.type == SLIDESHOW_TYPE.IMAGE) {
                            f_name = data_i.name;
                            curr_zip.file(f_name).async("blob").then(function(result) {
                                data_i.data = new File([result], f_name);
                            });
                        }
                    }

                    j++;
                }
                i++;
            }
        }
    }
}

function import_directory_data(curr_zip) {
    curr_zip.file("directory").async("string").then(function(result) {
        directory_data = JSON.parse(result);
        console.log(directory_data)
        
        import_image_files();

        update_version();

        render_editor();
    });
}

function export_directory_data_string() {
    for (k in SLIDESHOW_FIELD_NAME) {
        const menu_name = SLIDESHOW_FIELD_NAME[k];
        if (directory_data[menu_name] != undefined) {
            
            i = 0;
            while (i < directory_data[menu_name].length) {
                j = 0;
                while (j < directory_data[menu_name][i].files.length) {
                    file = directory_data[menu_name][i].files[j];
                    if (file.type == SLIDESHOW_TYPE.IMAGE) {
                        file.data_name = file.data.name;
                    }

                    j++;
                }
                i++;
            }
        }
    }
    console.log(directory_data);
    return `
        <script>
            var directory_data = ${JSON.stringify(directory_data)};
        </script>
    `;
}

function foreach_slideshow(f) {
    for (x in SLIDESHOW_FIELD_NAME) {
        f(directory_data[SLIDESHOW_FIELD_NAME[x]]);
    }
}

function update_version() {
    switch (directory_data.version.id) {
        case "1.0":
            foreach_slideshow(function (slideshow) {
                if (slideshow == undefined) {
                    return;
                }
                for (i = 0; i < slideshow.length; i++) {
                    section = slideshow[i];

                    for (j = 0; j < slideshow[i].files.length; j++) {
                        f = slideshow[i].files[j];
                        f.type = SLIDESHOW_TYPE.IMAGE;
                    }
                }
            });
            directory_data.setting = {
                site_name: "",
                coord: {
                    lat: "",
                    lon: "",
                }
            };
        case "1.1":
            directory_data.column_size = [];
            for (const c in directory_data.column_row) {
                directory_data.column_size.push("");
            }
        case "1.1.1":
            directory_data.setting.greeting_2 = directory_data.setting.site_name;
            directory_data.setting.greeting_1 = "Welcome to";
            delete directory_data.setting['site_name'];
        case "1.1.2":
            break;
        case "1.1.2":
            break;

    }
    previous_directory_data = JSON.parse(JSON.stringify(directory_data));
    directory_data.version = CURR_VERSION;
}



