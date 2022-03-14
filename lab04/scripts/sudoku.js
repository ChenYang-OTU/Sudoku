$(document).ready(function(){
    let board = $('#board');
    let palette = $('#palette');

    //make board
    for(let x = 0; x <=8;x++){
        let tr = $('<tr>')
        for (let y =0; y<=8; y++){
            let td = $('<td>');
            td.text('');
            td.attr('id', '' + x + y);
            td.click(pasteclick);
            tr.append(td);
        }
        board.append(tr);
    }

    //make palette
    for (let x = 1; x <= 10; x++) {
        let td = $('<td>');
        if (x != 10) {
            td.click(paletteclick);
            td.text(x);
            palette.append(td);            
        }
        else {
            palette.append(td);
            let img = '<img src="images/undo.png" alt="undo"/>';
            td.append(img);
            td.click(back);
        }        
    }

    var check_board = new Array(9);
    for (var i = 0; i < check_board.length; i++){
        check_board[i] = new Array(9);
    }
    for (var x = 0; x < check_board.length; x++){
        for (var y = 0; y < check_board[x].length; y++){
            check_board[x][y] = '';
        }
    }

    var traceback = ''
    function back(){
        check_board[traceback[0]][traceback[1]];
        getposition(traceback).text('')
        getposition(traceback).css("background-color", '');
    }

    function getposition(id){
        return $( "[id=" + id + "]");
    }

    var input = '';
    function paletteclick() {
        input = $(this).text();
    }

    function pasteclick() {
        var selects = $(this).text();
        if (selects != '') {
            alert("choose another plot please");
        }
        if (input == '') {
            alert("choose number from below please");
            
        }
        else {           
            var select_id = $(this).attr('id');
            row = select_id[0];
            col = select_id[1];
            if (check(input, row, col)) {
                $(this).text(input);
                check_board[row][col] = input;
                input = '';
                traceback = select_id;
            }
            else {
                $(this).css("background-color", "#000000");
                traceback = select_id;
            }
        }
    }
    
    function check(input, row, col){
        var truth1 = true;
        var truth2 = true;
        var truth3 = true;
        for (var x = 0; x < check_board.length; x++){
            for (var y = 0 ; y < check_board[x].length; y++){
                let id_1 = '' + row + col;
                let id_2 = '' + x + y;

                if (input == check_board[x][y]&& (!(id_1==id_2))){
                    if (sameBlock(row, col, y, x)){
                        truth1 = false;
                    }
                    if (sameRow(row, col, y, x)){
                        truth2 = false;
                    }
                    if (samaeColumn(row, col, y, x)){
                        truth3 = false;
                    }
                }
            }
        }
        ans = truth1 && truth2 && truth3;
        return ans;
    }


    function sameBlock(x1, y1, x2, y2) {
        let firstRow = Math.floor(y1 / 3) * 3;
        let firstCol = Math.floor(x1 / 3) * 3;
        return (y2 >= firstRow && y2 <= (firstRow + 2) && x2 >= firstCol && x2 <= (firstCol + 2));
     }
     
     function sameRow(x1, y1, x2, y2) {
        return y1 == y2;
     }     
     function sameColumn(x1, y1, x2, y2) {
        return x1 == x2;
     }
})