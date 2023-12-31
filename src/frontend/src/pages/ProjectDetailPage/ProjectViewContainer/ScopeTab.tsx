/*
 * This file is part of NER's FinishLine and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Project } from 'shared';
import { Box, Typography } from '@mui/material';
import RulesList from './RulesList';

const styles = {
  bulletList: {
    paddingLeft: '35px',
    marginBottom: '0em'
  }
};

export const ScopeTab = ({ project }: { project: Project }) => {
  const goals = project.goals.filter((goal) => !goal.dateDeleted).map((b, idx) => <li key={idx}>{b.detail}</li>);
  const features = project.features.filter((feature) => !feature.dateDeleted).map((b, idx) => <li key={idx}>{b.detail}</li>);
  const otherConstraints = project.otherConstraints
    .filter((constraint) => !constraint.dateDeleted)
    .map((b, idx) => <li key={idx}>{b.detail}</li>);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
      <Box width="50%">
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography
              variant="h5"
              sx={{
                cursor: 'pointer'
              }}
            >
              Goals
            </Typography>
          </Box>
          <ul style={styles.bulletList}>{goals}</ul>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography
              variant="h5"
              sx={{
                cursor: 'pointer'
              }}
            >
              {'Features'}
            </Typography>
          </Box>
          <ul style={styles.bulletList}>{features}</ul>
        </Box>
      </Box>
      <Box width="50%">
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography
              variant="h5"
              sx={{
                cursor: 'pointer'
              }}
            >
              {'Other Constraints'}
            </Typography>
          </Box>
          <ul style={styles.bulletList}>{otherConstraints}</ul>
        </Box>
        <RulesList rules={project.rules} />
      </Box>
    </Box>
  );
};
