import type { FunctionComponent } from 'react';

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
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{label}</Typography>
        <img
          alt={label}
          src={src}
          style={{
            // width: '100%',
            filter: ctn ? 'none' : 'grayscale(100%)',
            opacity: ctn ? 1 : 0.6,
          }}
        />
        {ctn && <Typography variant="body2">Count: {ctn}</Typography>}
      </CardContent>
    </Card>
  );
};

export default RewardCard;
