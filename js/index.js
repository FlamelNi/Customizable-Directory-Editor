
var t = 'hello';
function testFunction() {
    t = 
`
this is test with
multi line string
`;

    // x = `${1+2}`
    // console.log(x);
    // new zip.BlobReader(file);
}



var directory_data = reset_data();

function reset_data() {
    var temp = empty_data();
    temp.column_row = ['Col 1', 'Col 2'];
    return Object.create(temp);
}
function empty_data() {
    var temp = {
        column_row: Object.create([]),
    
        /*
        rows: [
            ['', ''],
            ['', ''],
        ],
        */
        rows: Object.create([]),
        // rows: [
        //     ['ad', 'ry'],
        //     ['adf', 'wer'],
        // ],
    };
    return Object.create(temp);
}

function set_test_data() {
    directory_data = reset_data();
    directory_data.rows.push(["1111", "2222"]);
    directory_data.rows.push(["3333", "4444"]);
    directory_data.rows.push(["5555", "6666"]);

    render_editor();
}

function get_HTML_column(i) {
    col = directory_data.column_row[i];
    result = 
    `
        <div class="col">
            <div id="${i}" class="col-function-row col" style="margin-bottom: 5px;">
                <button class="btn btn-primary" type="button" style="flex-grow: 0.2;" onclick="swap_col(${i}, ${i-1})">&#9665;</button>
                <div style="flex-basis: 15px;"></div>
                <button class="btn btn-warning" type="button" style="">Sort</button>
                <div style="flex-basis: 15px;"></div>
                <button class="btn btn-primary" type="button" style="flex-grow: 0.2" onclick="swap_col(${i}, ${i+1})">&#9655;</button>
            </div>
            
            <input id="col_${i}" class="form-control col" type="text" placeholder="column name" value="${col}">
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
                <input id="row_${j}_${i}" class="form-control col" type="text" placeholder="${col} entry" value=${row[j]}>
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

function render_editor() {
    result = ``
    result += get_HTML_column_row();
    result += get_HTML_all_rows();
    document.getElementById("render_div").innerHTML = result;
}

function read_HTML_to_update() {
    for (i = 0; i < directory_data.column_row.length; i++) {
        temp = document.getElementById(`col_${i}`).value;
        directory_data.column_row[i] = temp;
    }

    for (i = 0; i < directory_data.column_row.length; i++) {
        for (j = 0; j < directory_data.rows.length; j++) {
            t = document.getElementById(`row_${i}_${j}`).value;
            directory_data.rows[j][i] = t;
        }
    }
}

function new_row_at(i) {
    read_HTML_to_update();

    // rows = directory_data.rows
    // rows.push([]);
    // for (x = rows.length - 1; x > i; x--) {
    //     rows[x] = rows[x-1];
    // }
    // rows[i] = [];
    
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

    directory_data.rows.forEach(r => {
        var temp = r[i];
            r[i] = r[j];
            r[j] = temp;
    });

    render_editor()

}



