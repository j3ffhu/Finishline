import { WBS_Element_Status } from '@prisma/client';
import prisma from '../prisma/prisma';
import { WbsElementStatus } from 'shared';
import { NotFoundException } from './errors.utils';

/**
 * calculate the project's status based on its workpacakges' status
 * @param proj a given project to be calculated on its status
 * @returns the project's calculated wbs element status as either complete, active, or incomplete
 */
export const calculateProjectStatus = (proj: { workPackages: { wbsElement: { status: WBS_Element_Status } }[] }) => {
  if (proj.workPackages.length === 0) return WbsElementStatus.Inactive;

  if (proj.workPackages.every((wp) => wp.wbsElement.status === WbsElementStatus.Complete)) return WbsElementStatus.Complete;
  else if (proj.workPackages.some((wp) => wp.wbsElement.status === WbsElementStatus.Active)) return WbsElementStatus.Active;
  return WbsElementStatus.Inactive;
};

// gets highest current project number
export const getHighestProjectNumber = async (carNumber: number) => {
  const maxProjectNumber = await prisma.wBS_Element.aggregate({
    where: { carNumber },
    _max: { projectNumber: true }
  });

  return maxProjectNumber._max.projectNumber ?? 0;
};

// helper method to add the given description bullets into the database, linked to the given work package or project
export const addDescriptionBullets = async (addedDetails: string[], id: number, descriptionBulletIdField: string) => {
  // add the added bullets
  if (addedDetails.length > 0) {
    await prisma.description_Bullet.createMany({
      data: addedDetails.map((element) => {
        return {
          detail: element,
          [descriptionBulletIdField]: id
        };
      })
    });
  }
};

// edit descrption bullets in the db for each id and detail pair
export const editDescriptionBullets = async (editedIdsAndDetails: { id: number; detail: string }[]) => {
  if (editedIdsAndDetails.length < 1) return;
  editedIdsAndDetails.forEach(
    async (element) =>
      await prisma.description_Bullet.update({
        where: { descriptionId: element.id },
        data: { detail: element.detail }
      })
  );
};

// Given a user's id, this method returns the user's full name
export const getUserFullName = async (userId: number | null): Promise<string | null> => {
  if (!userId) return null;
  const user = await prisma.user.findUnique({ where: { userId } });
  if (!user) throw new NotFoundException('User', userId);
  return `${user.firstName} ${user.lastName}`;
};
