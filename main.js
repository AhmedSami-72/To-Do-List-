// ==================== ToDo Project ====================

function myToDoProject() {
  // تحديد العناصر من الـ DOM
  let input = document.getElementById("input");
  let add = document.getElementById("add");
  let taskContainer = document.getElementById("taskContainer");
  let clearButton = document.querySelector(".clear-button");

  // إضافة مهمة جديدة عند الضغط على زر الإضافة
  add.addEventListener("click", function () {
    if (input.value == "") {
      alert("Please Enter a New Task !!!");
    } else {
      // بناء مهمة جديدة
      let myTask = `
        <div id="myTask">
          <div class="left">
            <p class="paragraph">${input.value}</p>
          </div>
          <div class="right">
            <i class="fa-regular fa-square-check"></i>
            <i class="fa-regular fa-trash-can"></i>
          </div>
        </div>`;

      // إضافة المهمة إلى الـ Container
      taskContainer.innerHTML += myTask;
    }

    // إعادة تعيين قيمة الإدخال
    input.value = "";

    // حفظ المهام في الـ localStorage
    saveMyInfo();
  });

  // التعامل مع أيقونة الحذف والتحديد
  taskContainer.addEventListener("click", function (e) {
    if (e.target.className === "fa-regular fa-square-check") {
      // تحديد (Mark as done)
      let paragraphElement = e.target.parentElement.parentElement.querySelector(".paragraph");
      paragraphElement.classList.toggle("doneTask");
      saveMyInfo();
    } else if (e.target.className == "fa-regular fa-trash-can") {
      // حذف المهمة
      e.target.parentElement.parentElement.remove();
      saveMyInfo();
    }
  });

  // حذف كل المهام عند الضغط على زر "Clear"
  clearButton.addEventListener("click", function () {
    let tasks = document.querySelectorAll("#myTask");
    tasks.forEach(function (task) {
      task.remove();
    });
    saveMyInfo();
  });

  // تخزين المهام في localStorage
  function saveMyInfo() {
    localStorage.setItem("myTasks", taskContainer.innerHTML);
  }

  // استرجاع المهام من localStorage عند تحميل الصفحة
  function allInfo() {
    taskContainer.innerHTML = localStorage.getItem("myTasks");
  }

  allInfo();
}

myToDoProject(); // تشغيل مشروع ToDo


// ==================== Dark Mode Toggle ====================

// عناصر التحكم في الـ Dark Mode 
const body = document.querySelector("body"); 
const toggle = document.querySelector("#toggle"); 
const sunIcon = document.querySelector(".toggle .bxs-sun"); 
const moonIcon = document.querySelector(".toggle .bx-moon"); 
const input = document.querySelector("#input"); 
const addButton = document.querySelector("#add");
const taskContainer = document.querySelector("#taskContainer");

// تبديل الوضع الليلي/النهاري 
toggle.addEventListener("change", () => { 
  body.classList.toggle("dark"); 
  sunIcon.className = sunIcon.className === "bx bxs-sun" ? "bx bx-sun" : "bx bxs-sun"; 
  moonIcon.className = moonIcon.className === "bx bx-moon" ? "bx bx-moon" : "bx bxs-moon"; 
  input.classList.toggle("dark_mode"); 

  // تعديل كل التاسكات الحالية حسب الوضع
  document.querySelectorAll('.task').forEach(task => {
    task.classList.toggle('dark_task');
  });
});

// إضافة تاسك جديدة
addButton.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    const task = document.createElement("div");
    task.classList.add("task");
    task.innerText = input.value;

    // لو الوضع داكن.. ضيف كلاس الداكن للتاسك الجديدة
    if (body.classList.contains("dark")) {
      task.classList.add("dark_task");
    }

    taskContainer.appendChild(task);
    input.value = "";
  }
});



// ==================== Digital Clock ====================

function digitalClock() {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // التعامل مع الساعة 0
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  const time = `${hours}:${minutes}:${seconds} ${ampm}`;
  document.getElementById("clock").innerHTML = time;
}

// تحديث الساعة كل ثانية
setInterval(digitalClock, 1000);


// ==================== Animated Text ====================

// عناصر النص المتحرك
var text = document.querySelector("#animated-text .typing");
var messages = [
  "Success doesn't come from what you do occasionally,",
  "it comes",
  "from what you do consistently."
];
var currentMessageIndex = 0;
var currentCharacterIndex = 0;
var delayInMilliseconds = 1000; // تأخير بين الرسائل

// وظيفة الكتابة
function typeWriter() {
  if (currentCharacterIndex <= messages[currentMessageIndex].length) {
    text.innerHTML = messages[currentMessageIndex].substring(0, currentCharacterIndex);
    currentCharacterIndex++;
    setTimeout(typeWriter, delayInMilliseconds / 20);
  } else {
    setTimeout(eraseText, delayInMilliseconds * 1);
  }
}

// وظيفة المسح
function eraseText() {
  if (currentCharacterIndex >= 0) {
    text.innerHTML = messages[currentMessageIndex].substring(0, currentCharacterIndex);
    currentCharacterIndex--;
    setTimeout(eraseText, delayInMilliseconds / 20);
  } else {
    currentMessageIndex++;
    if (currentMessageIndex >= messages.length) {
      currentMessageIndex = 0;
    }
    setTimeout(typeWriter, delayInMilliseconds / 1);
  }
}

typeWriter();
