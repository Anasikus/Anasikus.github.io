import type { Project } from "./types";

import { flowersLife } from "./flowersLife";
import { shelkoPrint } from "./shelkoPrint";
import { togerher } from "./together";
import { vizCard } from "./vizCard";
import { collegeTour } from "./collegeTour";
import { coffeeShop } from "./coffeeShop";
import { flowersLifeDesktop } from "./flowersLifeDesktop";
import { abilimpiks } from "./abilimpiks";
import { autoDocUpdater } from "./autoDocUpdater";
import { todoApp } from "./todoApp";
import { priut } from "./priut";

/*
 * Порядок здесь — порядок на сайте: сначала самые крупные и
 * свежие работы, потом учебные и командные.
 */
export const projects: Project[] = [
  flowersLife,
  shelkoPrint,
  togerher,
  vizCard,
  collegeTour,
  coffeeShop,
  flowersLifeDesktop,
  abilimpiks,
  autoDocUpdater,
  todoApp,
  priut,
];
