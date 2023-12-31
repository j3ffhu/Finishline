/*
 * This file is part of NER's FinishLine and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WbsNumber } from 'shared';

export const exampleWbsWorkPackage1: WbsNumber = {
  carNumber: 1,
  projectNumber: 1,
  workPackageNumber: 1
};

export const exampleWbsWorkPackage2: WbsNumber = {
  carNumber: 1,
  projectNumber: 1,
  workPackageNumber: 2
};

export const exampleWbsWorkPackage3: WbsNumber = {
  carNumber: 2,
  projectNumber: 7,
  workPackageNumber: 3
};

export const exampleWbsWorkPackage4: WbsNumber = {
  carNumber: 2,
  projectNumber: 7,
  workPackageNumber: 4
};

export const exampleWbsWorkPackage5: WbsNumber = {
  carNumber: 2,
  projectNumber: 7,
  workPackageNumber: 5
};

export const exampleWbsProject1: WbsNumber = {
  carNumber: 1,
  projectNumber: 12,
  workPackageNumber: 0
};

export const exampleWbsProject2: WbsNumber = {
  carNumber: 2,
  projectNumber: 5,
  workPackageNumber: 0
};

export const exampleWbs1: WbsNumber = {
  carNumber: 1,
  projectNumber: 1,
  workPackageNumber: 1
};

export const exampleWbs2: WbsNumber = {
  carNumber: 1,
  projectNumber: 7,
  workPackageNumber: 1
};

export const exampleWbs3: WbsNumber = {
  carNumber: 1,
  projectNumber: 7,
  workPackageNumber: 3
};

export const exampleAllWbsNums: WbsNumber[] = [
  exampleWbsWorkPackage1,
  exampleWbsWorkPackage3,
  exampleWbsProject1,
  exampleWbsProject2,
  exampleWbs1,
  exampleWbs2,
  exampleWbs3
];
