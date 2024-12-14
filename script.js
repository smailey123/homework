// document.cookies =
//   "Math1,8:00,;Math2,9:30,;Math3,11:30,;.History1,8:30,;History2,10:30,;History3,12:30,;.Literature1,8:30,;Literature1,10:30,;Literature1,12:30,;.";
console.log("Те, як розклад виглядає в кукі", document.cookie);
document.cookie = "qwer=23423;path=/;max-age=10000000000000000000000"
//перетворення розкладу з кукі у js
function convertFromCookiesToJs() {
    let lessons;
    if(!document.cookie) {
        console.log('dd')
        document.cookie = "qwer=23423;path=/;max-age=100000000"
        console.log("asd",document.cookie)
        lessons = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
        ]
        return lessons;
    }
  //Ділю роклад за крапкою на дні
  const days = document.cookie.split(".");
  console.log("Дні", days);

  //Ділю дні за крапкою з комою на заняття,
  //але заняття ще не відформатованні
  //тобто виглядають якось так "Math1,8:00;"
  const lessonsNotFormatted = days
    .map(
      (
        day //метод .map() це просто більш проста форма циклу for
      ) => day.split(";").filter((lesson) => !!lesson)
    )
    .filter((day) => day.length != 0);
  console.log("Невідформатовані заняття", lessonsNotFormatted);

  //Ділю заняття по ,
  //Виходить з такого вигляду "Math1,8:00;"
  //у такий
  // {
  //   name:"Math",
  //   time:"8:00"
  // }
   lessons = lessonsNotFormatted.map((day) =>
    day.map((lesson) => {
      return {
        name: lesson.split(",")[0],
        time: lesson.split(",")[1],
      };
    })
  );

  console.log("Фінальний вигляд розкладу", lessons);
  return lessons
}
let lessons = convertFromCookiesToJs();
let h2 = document.querySelector('h2')
let dayNumber = 0
let dayButtons = document.querySelectorAll('.day1')
let _lessons = document.querySelector('.lessons')

_lessons.innerHTML = ``
if(lessons[dayNumber]){
    for(let i = 0;i < lessons[dayNumber].length;i++){
        _lessons.innerHTML += `<div class="lessons-item1">
            <p class="lessons-item3">${lessons[dayNumber][i].time} </p>
            <p class="lessons-item2">${lessons[dayNumber][i].name}</p>
        </div>`
    } 
    
}

for(let i = 0;i < dayButtons.length;i++){
    dayButtons[i].addEventListener("click", function(){
        dayNumber = i
        time.value = ''
        nameInput.value = ''
        _lessons.innerHTML = ``
        for(let i = 0;i < lessons[dayNumber].length;i++){
            _lessons.innerHTML += `<div class="lessons-item1">
                <p class="lessons-item3">${lessons[dayNumber][i].time} </p>
                <p class="lessons-item2">${lessons[dayNumber][i].name}</p>
            </div>`
        }    
        console.log(dayNumber);
    });
}

let create_button = document.querySelector('.create-button')
let nameInput = document.querySelector('.name')
let time = document.querySelector('.time')
console.log("sadfdsa",lessons[dayNumber])
function onAdd(dayNumber, time, name) {
    lessons[dayNumber].push({ name, time });
}

function saveToCookies() {
    let cookiesShedule = "";
  
    // document.cookies
    lessons.forEach((day) => {
      day.forEach((lesson) => {
        cookiesShedule += lesson.name + ",";
        cookiesShedule += lesson.time + ",;";
      });
      cookiesShedule += ".";
    });
  
    document.cookie = cookiesShedule;
    console.log("SADF",cookiesShedule);
}

create_button.addEventListener("click", function(e){
    e.preventDefault()
    onAdd(dayNumber,time.value,nameInput.value)
    time.value = ''
    nameInput.value = ''
    _lessons.innerHTML += `<div class="lessons-item1">
                <p class="lessons-item3">${lessons[dayNumber][lessons[dayNumber].length - 1].time} </p>
                <p class="lessons-item2">${lessons[dayNumber][lessons[dayNumber].length - 1].name}</p>
            </div>`
    saveToCookies()
    console.log("les",lessons)
    console.log('name')

})