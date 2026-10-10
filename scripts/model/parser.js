import { Month } from "./date.js";
import { Planning } from "./planning.js";

const expectedParams = [
  "Clôture",
  "Activité",
  "Heure début",
  "Heure fin",
  "Répétition",
  "Dates",
];

const months = Object.values(Month);

class Dictionnary {
  /**
   *
   * @param {string[]} array
   */
  constructor(array) {
    this.cloture = array[0] === "V" ? true : false;
    this.activity = array[1].trim();
    this.heureDebut = array[2].trim();
    const end = array[3].trim();
    this.heureFin = end === "/" || end === "" ? null : end;

    /**
     * @type {'hebdo' | 'period' | 'bihebdo' | 'multiple' | null}
     */
    this.repeat = null;
    switch (array[4].trim()) {
      case "HEBDO":
        this.repeat = "hebdo";
        break;
      case "BIHEBDO":
        this.repeat = "bihebdo";
        break;
      case "PERIOD":
        this.repeat = "period";
        break;
      case "MULTIPLE":
        this.repeat = "multiple";
        break;
    }

    /**
     * @type {{day: number, month: Month}[]}
     */
    this.dates = array[5]
      .trim()
      .split(",")
      .map((date) => {
        const [day, month] = date.trim().split(" ");
        const monthToUse = months.find(
          (el) => el.value.toUpperCase() === month.toUpperCase(),
        );
        return { day: parseInt(day), month: monthToUse };
      });
  }
}

export class Parser {
  /**
   *
   */
  constructor(separator = "|") {
    this.separator = separator;
  }

  /**
   *
   * @param {string} contenu
   */
  parse(contenu) {
    const backspaces = ["\r\n", "\n"];
    const backspace = backspaces.find((el) => contenu.includes(el));
    const lines = contenu
      .split(backspace)
      .filter(
        (el) =>
          !(el == null || el.length === 0 || !el.includes(this.separator)),
      );

    if (lines.length < 2) {
      console.log("Aucune ligne intéressante : " + `${contenu.toString()}`);

      return;
    }

    const firstLine = lines.shift();
    const params = this.getElements(firstLine);

    const errorParam =
      "Document invalide : les paramètres saisis ne sont pas ceux attendus";

    if (params.length != expectedParams.length) {
      throw new Error(errorParam);
    }

    const hasError = expectedParams.some((el, index) => params.at(index));
    return lines.map((line) => {
      const items = this.getElements(line);
      if (items.length != expectedParams.length) {
        throw new Error(errorParam);
      }
      return new Dictionnary(items);
    });
  }

  /**
   * @param {string} line
   * @returns string[]
   */
  getElements(line) {
    return line.split(this.separator).map((el) => el.trim());
  }
}
