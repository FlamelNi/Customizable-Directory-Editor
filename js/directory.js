
function get_template_HTML(f) {
    getTxt = function (){
        $.ajax({
            // url:'/js/index.js',
            url:'static/index.html',
            success: function (data){
                f(data);
            }
        });
    }
    getTxt();
}




function get_template_CSS(f) {
    getTxt = function (){
        $.ajax({
            url:'static/index.css',
            success: function (data){
                f(data);
            }
        });
    }
    getTxt();
}


function export_directory_js(curr_zip) {
    result = 
    `
    `;

    curr_zip.file("main.js", result);
    // return result;
}
