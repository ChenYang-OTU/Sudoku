$(document).ready(function(){


    let row = $('.row');
    row.addClass('header')   
    //row.click(function(){
        //alert($(this).index())
    //})

    row.click(deselectAll);
    row.click(selectRow);

    function selectRow(){
        let index = $(this).parent().index()
        let b = $('tr:nth-child('+(index + 1)+')')
        b.addClass('selected')
    }


    let col = $('tr:first-child th');
    col.addClass('header')
    // let col = $('tr:nth-child(2) td')
    //col.click(function(){
        //let index = $(this).index()
        //alert(index) 
    //})
    col.click(deselectAll);
    col.click(selectColumn);

    function selectColumn(){
        let index = $(this).index()
        let a = $('tr td:nth-child('+ (index + 1) +')')
        a.addClass('selected')
        //alert(index)
    }


    function deselectAll(){
        let c = $('tr td')
        c.removeClass('selected')
        let d = $('tr')
        d.removeClass('selected')
    }

})