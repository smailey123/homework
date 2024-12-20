// document.cookies =
//   "Math1,8:00,;Math2,9:30,;Math3,11:30,;.History1,8:30,;History2,10:30,;History3,12:30,;.Literature1,8:30,;Literature1,10:30,;Literature1,12:30,;.";
console.log("Те, як sdfasрозклад виглядає в кукі", document.cookie);

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name){
  const cookies = document.cookie.split("; ")
  let cookieValue;
  cookies.forEach(_cookie => {
    const [_name,value] = _cookie.split("=");
    if(name === _name) cookieValue = value;
  })
  return cookieValue;
}

const scheduleCookies = document.cookie
console.log("scheduleCookies",getCookie("schedule"))
// Usage:

//перетворення розкладу з кукі у js
function convertFromCookiesToJs() {
    let lessons;
    const scheduleCookie = getCookie("schedule");
    if(!scheduleCookie) {
      setCookie("schedule","[.[.[.[.[.[.[.")
        lessons = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
        ]
        console.log("l",lessons)
        return lessons;
    }
  //Ділю роклад за крапкою на дні
  const days = scheduleCookie.split(".").filter(day => day);
  console.log("Дні", days);

  //Ділю дні за крапкою з комою на заняття,
  //але заняття ще не відформатованні
  //тобто виглядають якось так "Math1,8:00;"
  const lessonsNotFormatted = days
    .map(
      (
        day //метод .map() це просто більш проста форма циклу for
      ) => {
        return day === "[" ? [] : day.split("[").filter((lesson) => lesson)
      }
    );
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
console.log(lessons);
let h2 = document.querySelector('h2')
let dayNumber = 0
let dayButtons = document.querySelectorAll('.day1')
let _lessons = document.querySelector('.lessons')

function deleteLesson(i) {
  lessons[dayNumber] = lessons[dayNumber].filter((lesson,_i) => _i !== i)
  console.log("delete",lessons)
  printLessons();  
  saveToCookies();
}
_lessons.innerHTML = ``
const printLessons = () => {
  _lessons.innerHTML = ``
  for(let i = 0;i < lessons[dayNumber].length;i++){
      _lessons.innerHTML += `<div class="lessons-item1">
          <p class="lessons-item3">${lessons[dayNumber][i].time} </p>
          <p class="lessons-item2">${lessons[dayNumber][i].name}</p>
          <button class="delete">x</button>
      </div>`
  }  
}

if(lessons[dayNumber]){

  printLessons();  
  const deleteButtons = document.querySelectorAll(".delete");

  console.log("deleteButtons",deleteButtons)
  for(let i = 0;i < lessons[dayNumber].length;i++){
    deleteButtons[i].addEventListener("click",() => {
      deleteLesson(i);
      console.log("delete",lessons)
    })
  }
}



for(let i = 0;i < dayButtons.length;i++){
    dayButtons[i].addEventListener("click", function(){
        dayNumber = i
        time.value = ''
        nameInput.value = ''
        printLessons();  
        const deleteButtons = document.querySelectorAll(".delete");
        for(let i = 0;i < lessons[dayNumber].length;i++){
          deleteButtons[i].addEventListener("click",() => {
            deleteLesson(i);

          })
        }
        
    });
}

let create_button = document.querySelector('.create-button')
let nameInput = document.querySelector('.name')
let time = document.querySelector('.time')

function onAdd(dayNumber, time, name) {
    lessons[dayNumber].push({ name, time });
}

function saveToCookies() {
    let cookiesShedule = "";

    for(let i = 0;i < 7;i++){
      if(lessons[i].length === 0) {
        cookiesShedule += "["
      }else{
        for(let j = 0;j < lessons[i].length;j++){
          cookiesShedule += lessons[i][j].name + ",";
          cookiesShedule += lessons[i][j].time + ",[";
        }
        
      }
      cookiesShedule += "."
    }
    // lessons.forEach((day) => {
    //   day.forEach((lesson) => {
    //     cookiesShedule += lesson.name + ",";
    //     cookiesShedule += lesson.time + ",[";
    //   });
    //   cookiesShedule += ".";
    // });
    console.log(lessons);
    console.log(cookiesShedule);
    setCookie("schedule",cookiesShedule,365);
}

create_button.addEventListener("click", function(e){
    e.preventDefault()
    onAdd(dayNumber,time.value,nameInput.value)
    time.value = ''
    nameInput.value = ''

    printLessons();
    const deleteButtons = document.querySelectorAll(".delete");

    for(let i = 0;i < lessons[dayNumber].length;i++){
      deleteButtons[i].addEventListener("click",() => {
        deleteLesson(i);

      })
    }
    saveToCookies();
})