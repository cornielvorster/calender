

const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const saPublicHolidays = {
    "New Year's Day": [0, 1],
    "Human Rights Day": [2, 21],
    "Good Friday": [],
    "Easter Monday": [],
    "Freedom Day": [3, 27],
    "Workers' Day": [4, 1],
    "Youth Day": [5, 16],
    "National Women's Day": [7, 9],
    "Heritage Day": [8, 24],
    "Day of Reconciliation": [11, 16],
    "Christmas Day": [11, 25],
    "Day of Goodwill (Boxing Day)": [11, 26]
};

function populateCalendar(year, month) {

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const calendarBody = document.getElementById("calendar-body");
    calendarBody.innerHTML = ""; // Clear previous content

    let date = 1;


    for (let week = 0; date <= daysInMonth; week++) {
        const row = document.createElement("tr");

        for (let day = 0; day < 7; day++) {
            const cell = document.createElement("td");
            cell.setAttribute("id", date);

            if (week === 0 && day < firstDay) {
                // Empty cells before the first day of the month
                cell.textContent = "";
                cell.setAttribute("id", 0);
            } else if (date <= daysInMonth) {
                // Fill cells with dates
                cell.textContent = date;
                date++;
            } else {
                // Empty cells after the last day of the month
                cell.textContent = "";
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }
    document.getElementById("header").innerHTML = currentYear + " - " + months[currentMonth];
    publicHoliday();
}

function nextCalender() {
    currentMonth = currentMonth + 1;
    year()
    populateCalendar(currentYear, currentMonth);
}

function backCalender() {
    currentMonth = currentMonth - 1;
    year()
    populateCalendar(currentYear, currentMonth);
}

function year() {
    if (currentMonth >= 12) {
        currentYear = currentYear + 1;
        currentMonth = 0;
    } else if (currentMonth < 0) {
        currentYear = currentYear - 1;
        currentMonth = 11;
    }
    else {
        return
    }
}



function publicHoliday() {
    calculateEaster(currentYear);
    for (day in saPublicHolidays) {
        if (saPublicHolidays[day][0] == currentMonth) {
            document.getElementById(saPublicHolidays[day][1]).innerHTML = saPublicHolidays[day][1] + ' - ' + day;
            document.getElementById(saPublicHolidays[day][1]).className = "public-holiday";
        }
    }
}

function calculateEaster(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31); // Month (March = 3, April = 4)
    const day = ((h + l - 7 * m + 114) % 31) + 1; // Day

    // Calculate Good Friday (two days before Easter)
    const goodFridayDay = day - 2;
    const goodFridayMonth = month - 1;

    // Calculate Easter Monday (one day after Easter)
    let easterMondayDay = day + 1;
    let easterMondayMonth = month - 1;

    if (easterMondayDay > 31) {
        easterMondayMonth = easterMondayMonth + 1;
        easterMondayDay = easterMondayDay - 31;
    }


    saPublicHolidays['Good Friday'] = [goodFridayMonth, goodFridayDay];
    saPublicHolidays['Easter Monday'] = [easterMondayMonth, easterMondayDay];
    return saPublicHolidays
}

populateCalendar(currentYear, currentMonth);





// Function to enable/disable editing of table cells
function toggleEdit() {
    const editableParagraphs = document.querySelectorAll('td p#edit');

    // Loop through each editable paragraph and make it editable
    editableParagraphs.forEach(paragraph => {
        paragraph.contentEditable = true;
    });
}

//Save Changes
function saveChanges() {
    calenderBody = document.getElementById("calender-body");
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (let i = 1; i < daysInMonth + 1; i++) {
        console.log(i);
    }

}




