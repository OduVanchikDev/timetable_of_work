function createCalendar(id, year, month) {
  var elem = document.getElementById(id);

  var mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
  var d = new Date(year, mon);
  let count = 0

  let str = '<th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th>'
  let table = `<table><tr>${str.repeat(5)}</tr><tr></tr>`


  // заполнить первый ряд от понедельника
  // и до дня, с которого начинается месяц
  // * * * | 1  2  3  4
  for (var i = 0; i < getDay(d); i++) {
    table += '<td></td>';
  }

  // ячейки календаря с датами
  while (d.getMonth() == mon) {
    table += '<td class="num" >' + d.getDate() + '</td>';
    count++

    // if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки
    //   table += '</tr><tr>';
    // }

    d.setDate(d.getDate() + 1);
  }
  // добить таблицу пустыми ячейками, если нужно
  if (getDay(d) != 0) {
    for (var i = getDay(d); i < count; i++) {
      table += '<td></td>';
    }
  }

  // закрыть таблицу
  table += '</tr></table>';
  table += '<button id="btn">add</button>'
  // только одно присваивание innerHTML
  elem.innerHTML = table;
}

function getDay(date) { // получить номер дня недели, от 0(пн) до 6(вс)
  var day = date.getDay();
  if (day == 0) day = 7;
  return day - 1;
}


createCalendar("calendar", 2012, 9)



let arr = []

let text = document.querySelectorAll('.num')
text.forEach(el => el.addEventListener('click', (e) => {

  e.target.classList.toggle('green')
  //arr.push(Number(e.target.innerHTML))

  if (arr.indexOf(Number(e.target.innerHTML)) === -1) {
    arr.push(Number(e.target.innerHTML))
  } else {
    let index = arr.indexOf(Number(e.target.innerHTML))
    //delete arr[index]
    arr.splice(index, 1)
  }


}))

let btn = document.getElementById('btn')
btn.addEventListener('click', (e) => {


  // +++______________+++вписать нужную ручку, на выходе массив чисел(даты) 

  //   fetch('/form', {
  //     method: 'POST',
  //     Headers: {
  //       'content-type': 'application/json'
  //     },
  //     body: JSON.stringify(arr)
  //   })
  // })


})


