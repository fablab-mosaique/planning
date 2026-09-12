import { Activity } from "../model/activity.js";
import { EventDate, Month } from "../model/date.js";
import { Planning } from "../model/planning.js";

const planning = new Planning(2026);
planning.repeatCloture(6, Month.SEPTEMBRE, 29, Month.AOUT, "hebdo");
planning.repeatCloture(7, Month.SEPTEMBRE, 30, Month.AOUT, "hebdo");
planning.repeatCloture(19, Month.DECEMBRE, 4, Month.JANVIER, "period");
planning.repeatCloture(17, Month.OCTOBRE, 2, Month.NOVEMBRE, "period");
planning.repeatCloture(20, Month.FEVRIER, 8, Month.MARS, "period");
planning.repeatCloture(17, Month.AVRIL, 3, Month.MAI, "period");
planning.repeatCloture(5, Month.MAI, 10, Month.MAI, "period");
planning.repeatCloture(3, Month.JUILLET, 31, Month.AOUT, "period");
planning.repeatEvent(
  19,
  Month.OCTOBRE,
  22,
  Month.OCTOBRE,
  "period",
  "balade en forêt",
  "14h",
  "18h",
);
planning.show();
