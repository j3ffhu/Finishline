/*
 * This file is part of NER's FinishLine and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import AdminToolsUserManagement from './AdminToolsUserManagement';
import AdminToolsSlackUpcomingDeadlines from './AdminToolsSlackUpcomingDeadlines';
import { useCurrentUser } from '../../hooks/users.hooks';
import { isAdmin } from 'shared';
import PageLayout from '../../components/PageLayout';
import AdminToolsFinanceConfig from './AdminToolsFinanceConfig';
import TeamsTools from './TeamsTools';

const AdminToolsPage: React.FC = () => {
  const currentUser = useCurrentUser();

  return (
    <PageLayout title="Admin Tools">
      <AdminToolsUserManagement />
      {isAdmin(currentUser.role) && <AdminToolsSlackUpcomingDeadlines />}
      {isAdmin(currentUser.role) && <AdminToolsFinanceConfig />}
      {isAdmin(currentUser.role) && <TeamsTools />}
    </PageLayout>
  );
};

export default AdminToolsPage;
