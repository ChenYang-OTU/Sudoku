const margin = { top: 30, right: 30, bottom: 70, left: 60 },
width = 460 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;

$(document).ready(function(){
    let table = $('#spreadsheet')
        $.ajax({
            type:'GET',
            url: "grades.csv",
            datatype: "text",
            success: function(response){
                let lines = response.split('\n')
                let tr = $('<tr>')
                let data1 = lines[0].split(',');
                for (let i=0; i<data1.length; i++){
                    let th = $('<th>')
                    th.text(data1[i])
                    tr.append(th)
                }
                table.append(tr)
                for (let i=1; i<lines.length; i++){
                    let tr = $('<tr>')
                    let data = lines[i].split(',');
                    let th = $('<th class = "row">')
                    th.text(data[0])
                    tr.append(th)
                    for (let j=1; j<data.length; j++){
                        let td = $('<td>')
                        td.text(data[j])
                        td.attr("id",""+i+j)
                        tr.append(td)
                    }
                    table.append(tr)
                }    
            $('td').dblclick(cellClick)

            let row = $('.row');
            row.addClass('header');
            let data = Array();
            row.click(deselectAll);
            row.click(selectRow);
            let frequency = [0,0,0,0,0];
            //let a = getCell('12').text();
            //console.log(a);

            function selectRow(){
                let index = $(this).parent().index()+1;
                console.log(index);
                let b = $('tr:nth-child('+(index)+')')
                data = [];
                //let temp = b.text().split(".",1)
                //$("#spreadsheet").each(function(){
                    //data.push($(this).find("td:nth-child("+ index +")").text())
                //})
                //console.log(data)
                for(i=1;i<=5;i++){
                    let att = getCell(''+(index-1)+i);
                    data.push(att.text());
                }
                //console.log(data);
                let numbers = data.map(Number)
                //console.log(numbers)
                countScore(numbers)
                drawChart(frequency)
                frequency = [0,0,0,0,0]
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

            function getCell(id) {
                return $("[id=" + id + "]")
            }
            function selectColumn(){
                let index = $(this).index() + 1
                let a = $('tr td:nth-child('+ (index) +')')
                data = [];
                $("#spreadsheet tr").each(function(){
                    data.push($(this).find("td:nth-child("+ index +")").text())
                })
                data.shift();
                // get the number of array for draw
                let numbers = data.map(Number)
                //console.log(numbers)
                countScore(numbers)
                //frequency list get
                console.log(frequency)
                drawChart(frequency)
                frequency = [0,0,0,0,0]
                a.addClass('selected')
            }
            

            function deselectAll(){
                let c = $('tr td')
                c.removeClass('selected')
                let d = $('tr')
                d.removeClass('selected')
            }
            function countScore(grades){
                for(let i = 0; i<grades.length; i++){
                    if(grades[i]>=80){
                        frequency[0]++;
                    }else if (grades[i] >= 70){
                        frequency[1]++;
                    }else if (grades[i] >= 60){
                        frequency[2]++;
                    }else if (grades[i] >= 50){
                        frequency[3]++;
                    }else{
                        frequency[4]++;
                    }
                }
                for (let i=0; i<frequency.length;i++){
                    frequency[i] = frequency[i] / grades.length
                }
                return frequency
            }
            function drawChart(test_frequency){
                $("svg").remove()
            
                var svg = d3.select("#my_dataviz")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", `translate(${margin.left},${margin.top})`);
            
                let Dummy_Data = [
                    { "grade": 'A', "frequency": test_frequency[0] },
                    { "grade": 'B', "frequency": test_frequency[1] },
                    { "grade": 'C', "frequency": test_frequency[2] },
                    { "grade": 'D', "frequency": test_frequency[3] },
                    { "grade": 'F', "frequency": test_frequency[4] },
                    ];
                // X axis
                const x = d3.scaleBand()
                    .range([0, width])
                    .domain(Dummy_Data.map(d => d.grade))
                    .padding(0.2);
                svg.append("g")
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(x))
                // Add Y axis
                const y = d3.scaleLinear()
                    .domain([0, 1])
                    .range([ height, 0]);
                svg.append("g")
                    .call(d3.axisLeft(y));
                // Bars
                svg.selectAll("mybar")
                    .data(Dummy_Data)
                    .join("rect")
                        .attr("x", d => x(d.grade))
                        .attr("y", d => y(d.frequency))
                        .attr("width", x.bandwidth())
                        .attr("height", d => height - y(d.frequency))
                        .attr("fill", "#69b3a2")
                
                //adding label
                svg.append('text')
                    .attr('x',width/2)
                    .attr('y',height/5)
                    .text('Grade Distribution')
                //adding X label
                svg.append('text')
                    .attr('x',width/1.1)
                    .attr('y',height/1.1)
                    .text('Grade')
                //adding Y label
                svg.append('text')
                    .attr('x',width/100)
                    .attr('y',height/60)
                    .text('Frequency')       
            }
            
            function cellClick(){
                let textfield = $('<input type="text">')
                textfield.val($(this).text())
                textfield.keypress(function(event){
                    if (event.which == 13){
                        // alert(event.which)
                        // alert($(event.target).val())
                        // $(event.target).parent().text('Hello')
                        let newValue = $(event.target).val();
                        $(event.target).parent().html(newValue)
                    }
                })    
                $(this).html(textfield)
                // alert($(this).text())
            }
            }       
        })    
    })