
import { csvToJs } from "./utility/cvsToJs.js";
import { createDropDay } from "./createDrops/postreportDay.js";
import { initCharts } from "./graficos/index.js";
export function initApp() {
  initCharts()
  createDropDay()

}

