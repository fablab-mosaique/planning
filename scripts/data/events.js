import { Activity } from "../model/activity.js";
import { EventDate, Month } from "../model/date.js";
import { Planning } from "../model/planning.js";

const planning = new Planning(2026);
// Activités hors vacances scolaires
planning.repeatEvent(
  2,
  Month.SEPTEMBRE,
  25,
  Month.AOUT,
  "hebdo",
  "Bac à sable (9-12 ans)",
  "14h",
  "16h",
);
planning.repeatEvent(
  2,
  Month.SEPTEMBRE,
  25,
  Month.AOUT,
  "hebdo",
  "Bac à sable (+13 ans)",
  "16h",
  "18h",
);

// Vacances scolaires
planning.repeatCloture(6, Month.SEPTEMBRE, 29, Month.AOUT, "hebdo");
planning.repeatCloture(7, Month.SEPTEMBRE, 30, Month.AOUT, "hebdo");
planning.repeatCloture(19, Month.DECEMBRE, 4, Month.JANVIER, "period");
planning.repeatCloture(17, Month.OCTOBRE, 2, Month.NOVEMBRE, "period");
planning.repeatCloture(20, Month.FEVRIER, 8, Month.MARS, "period");
planning.repeatCloture(17, Month.AVRIL, 3, Month.MAI, "period");
planning.repeatCloture(5, Month.MAI, 10, Month.MAI, "period");
planning.repeatCloture(3, Month.JUILLET, 31, Month.AOUT, "period");
// Jours fériés
planning.addCloture(1, Month.NOVEMBRE);
planning.addCloture(11, Month.NOVEMBRE);
planning.addCloture(25, Month.DECEMBRE);
planning.addCloture(29, Month.MARS);
planning.addCloture(1, Month.MAI);
planning.addCloture(6, Month.MAI);
planning.addCloture(8, Month.MAI);
planning.addCloture(17, Month.MAI);
planning.addCloture(14, Month.JUILLET);
planning.addCloture(15, Month.AOUT);
// Evenements
planning.addEvent(
  1,
  Month.OCTOBRE,
  "Initiation à l'impression 3D (adultes)",
  "16h",
);
planning.addEvents(
  [
    { day: 10, month: Month.OCTOBRE },
    { day: 7, month: Month.NOVEMBRE },
    { day: 21, month: Month.NOVEMBRE },
    { day: 5, month: Month.DECEMBRE },
  ],
  "Fablab libre",
  "9h",
);
planning.addEvent(
  7,
  Month.NOVEMBRE,
  "Découverte de l'impression 3D avec TinkerCad",
  "14h",
);
planning.addEvent(
  21,
  Month.NOVEMBRE,
  "Découverte du prototypage électronique avec Arduino et ESP32",
  "14h",
);
planning.addEvent(5, Month.DECEMBRE, "Création de circuits imprimés", "14h");

planning.show();
