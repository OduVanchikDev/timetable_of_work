function createCalendar(id, year, month, arr) {
  var elem = document.getElementById(id);

  var mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
  var d = new Date(year, mon);
  let count = 0;

  let str =
    "<th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th>";
  let table = `<table><tr>${str.repeat(5)}</tr><tr></tr>`;

  // заполнить первый ряд от понедельника
  // и до дня, с которого начинается месяц
  // * * * | 1  2  3  4
  for (var i = 0; i < getDay(d); i++) {
    table += "<td></td>";
  }

  // ячейки календаря с датами
  while (d.getMonth() == mon) {
    table +=
      '<td class="num ' +
      (arr.includes(d.getDate()) ? "disabled" : "") +
      '" >' +
      d.getDate() +
      "</td>";

    //if они равны меняем класс

    count++;

    // if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки
    //   table += '</tr><tr>';
    // }

    d.setDate(d.getDate() + 1);
  }

  // добить таблицу пустыми ячейками, если нужно
  if (getDay(d) != 0) {
    for (var i = getDay(d); i < count; i++) {
      table += "<td></td>";
    }
  }

  // закрыть таблицу
  table += "</tr></table>";
  table += '<button id="btn">add</button>';
  // только одно присваивание innerHTML
  elem.innerHTML = table;
}
let green = document.getElementsByClassName("disabled");

//green.forEach(el => el.style.background = 'green')

function getDay(date) {
  // получить номер дня недели, от 0(пн) до 6(вс)
  var day = date.getDay();
  if (day == 0) day = 7;
  return day - 1;
}

createCalendar("calendar", 2012, 9, [3, 5, 7, 9]);

let arr = [];

let text = document.querySelectorAll(".num");
text.forEach((el) =>
  el.addEventListener("click", (e) => {
    if (e.target.classList.contains("disabled")) {
      alert("нужно сформировать запрос на коллеге, эта дата занята");
    }
    e.target.classList.toggle("green");
    //arr.push(Number(e.target.innerHTML))

    if (arr.indexOf(Number(e.target.innerHTML)) === -1) {
      arr.push(Number(e.target.innerHTML));
    } else {
      let index = arr.indexOf(Number(e.target.innerHTML));
      //delete arr[index]
      arr.splice(index, 1);
    }
  })
);
// не работает на getElementsByClassName

let cd = document.querySelectorAll(".disabled");
let as = [...cd];
as.map((el) =>
  el.style.background === "" ? (el.style.background = "green") : ""
);

let btn = document.getElementById("btn");
btn.addEventListener("click", (e) => {
  // +++______________+++вписать нужную ручку, на выходе массив чисел(даты) количество дней
  //   fetch('/form', {
  //     method: 'POST',
  //     Headers: {
  //       'content-type': 'application/json'
  //     },
  //     body: JSON.stringify({ arr:arr, count: count })
  //   })
  // })
});
