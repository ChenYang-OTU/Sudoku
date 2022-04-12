$(document).ready(function(){
    $("#datepicker").datepicker();

    $('#MovieForm').submit(function(event){
        event.preventDefault();
        let ML = $('#MovieLocation').val()
        let MT = $('#datepicker').val()
        //alert(ML)
        $.ajax({ //asscess json
            type: 'GET',
            url: 'showtimes.json',
            success: function(data){
                //console.log(data)
                var table = $('<table>')
                $('#results').html('')
                $.each(data, function(key, value){
                if ((value.location == ML) && (value.date == MT)){
                    console.log(value.times)
                    tr = $('<tr>')
                    //print(data)
                    for(let r=0; r <value.times.length;r++){
                    for(let l =0; l<=1; l++){
                        let td = $('<td>')
                        if(l==0 && r == 0){
                            td.text(value.title);
                            td.click(clickTitle)
                            td.css("cursor", "pointer");
                        }else if(l == 1){
                            //for(let i = 0; i < value.times.length; i++){
                            td.text(value.times[r])
                            td.css("text-align", "right")
                            //}
                        }
                        tr.append(td)
                    }
                    table.append(tr)
                    //$('#results').append(value.title + '<br>')
                    }
                }
                })
                $('#results').append(table)
            }
        })
    })

/*     function print(data){
        let info = $('#results');
        for(let i=0; i<data.length; i++){
            var table = $('<table>')
            let movie = data[i].title
            let times = data[i].times
            for(let r=0; r< times.length; r++){
                let tr = $('<tr>')
                for(let l =0; l<=1; l++){
                    let td = $('<td>')
                    if(l==0 && r==0){
                        td.text(movie);
                        //td.click(clickTitle)
                    }else if(l == 1){
                        td.text(times[r])
                        td.css("text-align", "right")
                    }
                    tr.append(td)
                }
                table.append(tr)
            }
            info.append(table)
        }
    } */

    function clickTitle(){
        var value = $(this).text();
        $.ajax({
            type: 'GET',
            url: 'http://www.omdbapi.com/?apikey=' + '4a41ec3c' + '&t=' + value,
            success: function(data){
                console.log(data)
                console.log(data.Poster)
                let profile =$('#rightForm')
                profile.empty();
                let image = $('<img>');
                image.attr('src', data.Poster)
                image.attr('width', '200')
                image.attr('height', '300')
                profile.append(image)
                profile.append('<br>')

                let label_1 = $('<label>')
                label_1.attr("for", "Title")
                label_1.text("Title: ")
                profile.append(label_1)
                let textfield_1 = $('<input>')
                textfield_1.attr("id", "Title")
                textfield_1.attr("type", "text")
                textfield_1.val(data.Title)
                profile.append(textfield_1)
                profile.append('<br>')

                let label_2 = $('<label>')
                label_2.attr("for", "Year")
                label_2.text("Year: ")
                profile.append(label_2)
                let textfield_2 = $('<input>')
                textfield_2.attr("id", "Year")
                textfield_2.attr("type", "text")
                textfield_2.val(data.Year)
                profile.append(textfield_2)
                profile.append('<br>')

                let label_3 = $('<label>')
                label_3.attr("for", "Genre")
                label_3.text("Genre: ")
                profile.append(label_3)
                let textfield_3 = $('<input>')
                textfield_3.attr("id", "Genre")
                textfield_3.attr("type", "text")
                textfield_3.val(data.Genre)
                profile.append(textfield_3)
                profile.append('<br>')

                let label_4 = $('<label>')
                label_4.attr("for", "Runtime")
                label_4.text("Runtime: ")
                profile.append(label_4)
                let textfield_4 = $('<input>')
                textfield_4.attr("id", "Runtime")
                textfield_4.attr("type", "text")
                textfield_4.val(data.Runtime)
                profile.append(textfield_4)
                profile.append('<br>')

                let label_5 = $('<label>')
                label_5.attr("for", "Director")
                label_5.text("Director: ")
                profile.append(label_5)
                let textfield_5 = $('<input>')
                textfield_5.attr("id", "Director")
                textfield_5.attr("type", "text")
                textfield_5.val(data.Director)
                profile.append(textfield_5)
                profile.append('<br>')

                let label_6 = $('<label>')
                label_6.attr("for", "Writer")
                label_6.text("Writer: ")
                profile.append(label_6)
                let textfield_6 = $('<input>')
                textfield_6.attr("id", "Writer")
                textfield_6.attr("type", "text")
                textfield_6.val(data.Writer)
                profile.append(textfield_6)
                profile.append('<br>')

                let label_7 = $('<label>')
                label_7.attr("for", "Actors")
                label_7.text("Actors: ")
                profile.append(label_7)
                let textfield_7 = $('<input>')
                textfield_7.attr("id", "Actors")
                textfield_7.attr("type", "text")
                textfield_7.val(data.Actors)
                profile.append(textfield_7)
                profile.append('<br>')

            
            }
        })
    }

/*     $('#MovieForm').submit(function(event){
        event.preventDefault();
        let MN = $('#MovieName').val()
        //alert(MN)
        $.ajax({ //asscess json
            type: 'GET',
            url: 'http://www.omdbapi.com/?apikey=' + '4a41ec3c' + '&t=' + MN ,
            success: function(data){
                console.log(data)
                $('#results').html('')
                let a = data.Genre
                $('#results').html(a)
            }
        })
    }) */

})