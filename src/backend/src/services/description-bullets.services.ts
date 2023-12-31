import { User, WBS_Element_Status } from '@prisma/client';
import prisma from '../prisma/prisma';
import { hasBulletCheckingPermissions } from '../utils/description-bullets.utils';
import { AccessDeniedException, HttpException, NotFoundException, DeletedException } from '../utils/errors.utils';
import descriptionBulletTransformer from '../transformers/description-bullets.transformer';
import descriptionBulletQueryArgs from '../prisma-query-args/description-bullets.query-args';
import { DescriptionBullet } from 'shared';

export default class DescriptionBulletsService {
  /**
   * Checks the description bullet
   * @param user user that checks the description bullet
   * @param descriptionId description of bullet that is being checked
   * @throws if bullet doesn't exist or if the bullet is not linked to anything valid
   * @returns a checked description bullet
   */
  static async checkDescriptionBullet(user: User, descriptionId: number): Promise<DescriptionBullet> {
    const originalDB = await prisma.description_Bullet.findUnique({
      where: { descriptionId },
      include: {
        workPackageDeliverables: { include: { wbsElement: true } },
        workPackageExpectedActivities: { include: { wbsElement: true } }
      }
    });
    if (!originalDB) throw new NotFoundException('Description Bullet', descriptionId);

    if (originalDB.dateDeleted) throw new DeletedException('Description Bullet', descriptionId);

    const workPackage = originalDB.workPackageDeliverables || originalDB.workPackageExpectedActivities;

    if (!workPackage)
      throw new HttpException(400, 'This description bullet is not tied to a workpackage deliverable or expected activity');

    if (workPackage.wbsElement.status !== WBS_Element_Status.ACTIVE)
      throw new HttpException(400, 'Cannot check a description bullet on an inactive work package!');

    const hasPerms = await hasBulletCheckingPermissions(user.userId, descriptionId);

    if (!hasPerms) throw new AccessDeniedException();

    let updatedDB;

    if (originalDB.userCheckedId) {
      updatedDB = await prisma.description_Bullet.update({
        where: { descriptionId },
        data: {
          userCheckedId: null,
          dateTimeChecked: null
        },
        ...descriptionBulletQueryArgs
      });
    } else {
      updatedDB = await prisma.description_Bullet.update({
        where: { descriptionId },
        data: {
          userCheckedId: user.userId,
          dateTimeChecked: new Date()
        },
        ...descriptionBulletQueryArgs
      });
    }

    return descriptionBulletTransformer(updatedDB);
  }
}
