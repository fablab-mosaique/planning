import { Activity } from "./activity.js";
import { Day, EventDate, Month } from "./date.js";

export class Planning {
  /**
   *
   * @param {number} year
   */
  constructor(year) {
    this.year = year;
    this._months = Array.from(Object.values(Month));
    this.indexRotate = this._months.findIndex((el) => el.value === "Septembre");
    const rotate = [
      ...this._months.slice(this.indexRotate),
      ...this._months.slice(0, this.indexRotate),
    ];
    /**
     * @type {{name: string, days: EventDate[]}[]}
     */
    this.data = [];

    rotate.forEach((el, indexMonth) => {
      const currentYear =
        indexMonth < this._months.length - this.indexRotate ? year : year + 1;
      const nbJours = this._nbJoursFrom(el.nbJours, currentYear);

      const days = [];
      for (let indexDay = 0; indexDay < nbJours; ++indexDay) {
        const eventDate = new EventDate(
          indexDay + 1,
          (this.indexRotate + indexMonth + 1) % this._months.length ||
            this._months.length,
          currentYear,
        );
        days.push(eventDate);
      }
      this.data.push({
        name: el.value + " " + currentYear,
        days,
      });
    });
  }

  /**
   * Permet de rajouter un événment unique sur un seul jour
   * @param {number} day jour du mois
   * @param {Month} month mois en question (ex: Day.JANVIER)
   * @param {name} activity nom de l'événement
   * @param {string} start début de l'événement
   * @param {string} end fin de l'événement (peut ne pas être renseigné)
   */
  addEvent(day, month, activity, start, end) {
    const eventDay = this._getDayFrom(day, month);
    eventDay.addActivity(new Activity(activity, start, end));
    eventDay.setCloture(false);
  }

  addCloture(day, month) {
    this._getDayFrom(day, month).setCloture(true);
  }

  /**
   *
   * @param {number} startDay
   * @param {Month} startMonth
   * @param {number} endDay
   * @param {Month} endMonth
   * @param {'hebdo' | 'period'} mode
   */
  repeatCloture(startDay, startMonth, endDay, endMonth, mode) {
    this._repeatEvent(startDay, startMonth, endDay, endMonth, mode, (current) =>
      current.setCloture(true),
    );
  }

  /**
   *
   * @param {number} startDay
   * @param {Month} startMonth
   * @param {number} endDay
   * @param {Month} endMonth
   * @param {'hebdo' | 'period'} mode
   * @param {string} activity
   * @param {string} startTime
   * @param {string} endTime
   */
  repeatEvent(
    startDay,
    startMonth,
    endDay,
    endMonth,
    mode,
    activity,
    startTime,
    endTime,
  ) {
    this._repeatEvent(
      startDay,
      startMonth,
      endDay,
      endMonth,
      mode,
      (current) => {
        current.addActivity(new Activity(activity, startTime, endTime));
        current.setCloture(false);
      },
    );
  }

  /**
   *
   * @param {number} startDay
   * @param {Month} startMonth
   * @param {number} endDay
   * @param {Month} endMonth
   * @param {'hebdo' | 'period'} mode
   * @param {(current:EventDate) => void} f
   */
  _repeatEvent(startDay, startMonth, endDay, endMonth, mode, f) {
    const startDate = this._getDayFrom(startDay, startMonth);
    const endDate = this._getDayFrom(endDay, endMonth);
    let jump = 0;
    if (mode === "hebdo") {
      jump = 7;
    } else if (mode === "period") {
      jump = 1;
    }

    let current = startDate;

    while (true) {
      f(current);

      if (
        current.day === endDate.day &&
        current.month === endDate.month &&
        current.year === endDate.year
      ) {
        break;
      }

      const next = current.add(jump);
      const month = this._months[next.month - 1];

      current = this._getDayFrom(next.day, month);
    }
  }

  show() {
    const today = new Date();
    const dest = document.getElementById("container");
    const destResume = document.getElementById("resume");
    this.data.forEach((el) => {
      // initialize resume
      const spanMonthResume = document.createElement("span");
      spanMonthResume.classList.add("month-resume");
      spanMonthResume.textContent = el.name;
      spanMonthResume.addEventListener("click", function () {
        Planning.navigateTo(this.textContent);
      });
      destResume.appendChild(spanMonthResume);

      // initialize pannel
      const divMonth = document.createElement("div");
      divMonth.classList.add("month");
      divMonth.id = el.name;
      const spanMonth = document.createElement("span");
      spanMonth.textContent = el.name;
      spanMonth.classList.add("mx-auto");
      divMonth.appendChild(spanMonth);

      const calendar = document.createElement("div");
      calendar.classList.add("grid", "grid-cols-7", "gap-4");
      const tabDays = Array.from(Object.values(Day));
      const indexLundi = tabDays.findIndex((el) => el === "lundi");
      const indexDay = tabDays.findIndex((day) => day === el.days[0].dayValue);

      const nbTrous = indexDay - indexLundi;
      for (let z = 0; z < nbTrous; z++) {
        const dateTmp = document.createElement("div");
        calendar.appendChild(dateTmp);
      }
      el.days.forEach((dayEvent) => {
        const date = document.createElement("div");
        date.classList.add("date");

        if (
          today.getDate() === dayEvent.day &&
          today.getFullYear() === dayEvent.year &&
          today.getMonth() + 1 === dayEvent.month
        ) {
          date.classList.add("today");
        }

        if (dayEvent.activities.length > 0 || dayEvent.cloture) {
          if (dayEvent.cloture) {
            date.classList.add("cloture");
          } else {
            date.classList.add("activities");
          }
          date.addEventListener("click", function () {
            const summary = document.getElementById(`${el.name}_summary`);
            if (!summary) {
              return;
            }
            summary.classList.remove("hidden!");
            if (summary.children) {
              Array.from(summary.children).forEach((el) => el.remove());
            }
            if (dayEvent.cloture) {
              const span = document.createElement("p");
              span.innerHTML = `Informations du ${dayEvent.frValue}<br/>Le FabLab est fermé ce jour.`;
              span.classList.add(
                "text-center",
                "sticky",
                "top-0",
                "bg-(--main-light)",
              );
              summary.appendChild(span);
            } else {
              const span = document.createElement("h3");
              span.textContent = "Activités du " + dayEvent.frValue;
              span.classList.add(
                "text-center",
                "sticky",
                "top-0",
                "bg-(--main-light)",
              );
              summary.appendChild(span);
              const ul = document.createElement("ul");
              ul.classList.add("list-disc", "pl-16");
              dayEvent.activities.forEach((el) => {
                const liName = document.createElement("li");
                let content = "";
                if (el.startTime && el.endTime) {
                  content += `${el.startTime} -> ${el.endTime} : `;
                } else if (el.startTime) {
                  content += `${el.startTime} : `;
                }
                liName.textContent = `${content}${el.name}`;
                ul.appendChild(liName);
              });
              summary.appendChild(ul);
            }
          });
        }

        const spanDate = document.createElement("span");
        spanDate.textContent = dayEvent.dayValue;

        const spanNum = document.createElement("span");
        spanNum.textContent = dayEvent.day;
        date.appendChild(spanDate);
        date.appendChild(spanNum);
        calendar.appendChild(date);
      });

      divMonth.appendChild(calendar);

      // barre de résumé
      const divActivitiesOnDay = document.createElement("div");
      divActivitiesOnDay.id = `${el.name}_summary`;
      divActivitiesOnDay.classList.add("resume-day", "hidden!");
      divMonth.appendChild(divActivitiesOnDay);

      dest.appendChild(divMonth);
    });

    const visit = this._months.find((el, index) => index === today.getMonth());
    Planning.navigateTo(`${visit.value} ${today.getFullYear()}`);
  }

  /**
   *
   * @param {number} day
   * @param {Month} month
   */
  _getDayFrom(day, month) {
    const indexMonth = this._months.findIndex((el) => el === month);
    const indexInData =
      (this._months.length - this.indexRotate + indexMonth) %
      this._months.length;
    return this.data[indexInData].days[day - 1];
  }

  /**
   *
   * @param {string} anchor
   */
  static navigateTo(anchor) {
    document.getElementById(anchor)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }

  _nbJoursFrom(nbJours, year) {
    if (nbJours !== "auto") {
      return nbJours;
    }

    return this._isBissextileYear(year) ? 29 : 28;
  }

  /**
   *
   * @param {number} year
   */
  _isBissextileYear(year) {
    if (year % 400 === 0) {
      return true;
    }
    return year % 100 !== 0 && year % 4 === 0;
  }
}
