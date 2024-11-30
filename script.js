document.cookies =
  "Math1,8:00,;Math2,9:30,;Math3,11:30,;.History1,8:30,;History2,10:30,;History3,12:30,;.Literature1,8:30,;Literature1,10:30,;Literature1,12:30,;.";
console.log("Те, як розклад виглядає в кукі", document.cookies);

//перетворення розкладу з кукі у js
function convertFromCookiesToJs() {
  //Ділю роклад за крапкою на дні
  const days = document.cookies.split(".");
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
  const lessons = lessonsNotFormatted.map((day) =>
    day.map((lesson) => {
      return {
        name: lesson.split(",")[0],
        time: lesson.split(",")[1],
      };
    })
  );

  console.log("Фінальний вигляд розкладу", lessons);
}
convertFromCookiesToJs();
let h2 = document.querySelector('h2')
let dayNumber = 0
let dayButtons = document.querySelectorAll('.day1')

for(let i = 0;i < dayButtons.length;i++){
    dayButtons[i].addEventListener("click", function(){
        dayNumber = i
        console.log(dayNumber);
    });
}


