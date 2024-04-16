
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


    read_HTML_to_update();
}

var directory_data = empty_data();

function empty_data() {
    var temp = {
        column_row: [],
        column_row: ['test', 'test2'],
    
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
    };
    return Object.create(temp);
}

function get_HTML_column(i) {
    col = directory_data.column_row[i];
    result = 
    `
        <div class="col">
            <div id="${i}" class="col-function-row col" style="margin-bottom: 5px;">
                <button class="btn btn-primary" type="button" style="flex-grow: 0.2;">&#9665;</button>
                <div style="flex-basis: 15px;"></div>
                <button class="btn btn-warning" type="button" style="">Sort</button>
                <div style="flex-basis: 15px;"></div>
                <button class="btn btn-primary" type="button" style="flex-grow: 0.2">&#9655;</button>
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
                    <button class="btn btn-danger" style="flex-grow: 0.7" onclick=""> Delete </button>
                </div>
    `;
    for (j = 0; j < directory_data.column_row.length; j++) {
        col = directory_data.column_row[j];

        //row_{#col}_{#row}
        result +=
        `
            <div class="col">
                <input id="row_${j}_${i}" class="form-control col" type="text" placeholder="${col}" value=${row[j]}>
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

    rows = directory_data.rows
    rows.push([]);
    for (x = rows.length - 1; x > i; x--) {
        rows[x] = rows[x-1];
    }
    rows[i] = [];
    for (c in directory_data.column_row) {
        rows[i].push("");
    }

    render_editor();
}




