import { Activity } from "../model/activity.js";
import { EventDate, Month } from "../model/date.js";
import { Planning } from "../model/planning.js";

const planning = new Planning(2026);

// Evenements
await planning.loadFile("planning.txt");

planning.addEvent(10, Month.NOVEMBRE, "Atelier Bricolab", "10h30", "12h");

planning.show();
