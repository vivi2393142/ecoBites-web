import type { FunctionComponent } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface RewardCardProps {
  label: string;
  src: string;
  ctn: number;
}

const RewardCard: FunctionComponent<RewardCardProps> = ({ label, src, ctn }: RewardCardProps) => {
  return (
    <Card>
      <CardContent sx={{ p: 1.5, ':last-child': { p: 1.5 } }}>
        <img
          alt={label}
          src={src}
          style={{
            width: '100%',
            filter: ctn ? 'none' : 'grayscale(100%)',
            opacity: ctn ? 1 : 0.6,
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          <Typography variant="h6">{label}</Typography>
          {ctn ? (
            <Typography variant="h6" color="primary">
              {ctn}
            </Typography>
          ) : null}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RewardCard;
