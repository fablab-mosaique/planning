import { Activity } from "./activity.js";

export const Day = Object.freeze({
  LUNDI: "lundi",
  MARDI: "mardi",
  MERCREDI: "mercredi",
  JEUDI: "jeudi",
  VENDREDI: "vendredi",
  SAMEDI: "samedi",
  DIMANCHE: "dimanche",
});

export const Month = Object.freeze({
  JANVIER: { value: "Janvier", nbJours: 31 },
  FEVRIER: { value: "Février", nbJours: "auto" },
  MARS: { value: "Mars", nbJours: 31 },
  AVRIL: { value: "Avril", nbJours: 30 },
  MAI: { value: "Mai", nbJours: 31 },
  JUIN: { value: "Juin", nbJours: 30 },
  JUILLET: { value: "Juillet", nbJours: 31 },
  AOUT: { value: "Août", nbJours: 31 },
  SEPTEMBRE: { value: "Septembre", nbJours: 30 },
  OCTOBRE: { value: "Octobre", nbJours: 31 },
  NOVEMBRE: { value: "Novembre", nbJours: 30 },
  DECEMBRE: { value: "Décembre", nbJours: 31 },
});

export class EventDate {
  /**
   *
   * @param {number} day
   * @param {number} month
   * @param {number} year
   */
  constructor(day, month, year) {
    const months = Object.values(Month).map((el) => el.value);
    const days = Object.values(Day);
    this.day = day;
    this.month = month;
    this.year = year;
    this.monthValue = months[month - 1];
    this.value = new Date(`${year}-${month}-${day}`);
    this.dayValue = days[(days.length + this.value.getDay() - 1) % days.length];
    if (!this.dayValue) {
      console.log(this.dayValue, this.value.getDay());
    }

    /**
     * @type {Activity[]}
     */
    this.activities = [];

    this.frValue = this.toString();
  }

  /**
   *
   * @param {Activity} activity
   */
  addActivity(activity) {
    this.activities.push(activity);
  }

  /**
   * Calcule le nième jour après
   * @param {number} nbJours
   */
  add(nbJours) {
    const date = new Date(this.value);
    date.setDate(this.value.getDate() + nbJours);
    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
  }

  /**
   *
   * @param {boolean} value
   */
  setCloture(value) {
    this.cloture = value;
  }

  toString() {
    return `${this.dayValue} ${this.day} ${this.monthValue} ${this.year}`;
  }
}
