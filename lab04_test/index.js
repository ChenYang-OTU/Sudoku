
$(document).ready(function(){

    let board = $('#board'); //get my board in html
    for(let y = 0; y<3;y++){
        let tr = $('<tr>');

        for (let x=0;x<3;x++){
            let td = $('<td>'); //writing table
            td.attr('id',''+ x + y)
            td.text(' ');
            td.click(function(){
                $(this).text(paletteValue)
            })
            tr.append(td);
        }
        board.append(tr)
    }

    let palette = $('#palette');
    for(let y = 0; y<1;y++){
        let tr = $('<tr>');
        for (let x=0;x<3;x++){
            let td = $('<td>'); //writing table
            td.text(x+1);
            td.click(paletteClick)
            tr.append(td);}
        palette.append(tr)
    }

    var paletteValue = ''
    function paletteClick(){
        paletteValue = $(this).text()
        alert(paletteValue)
    }
})