import { Box, Typography } from '@mui/material';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const Historia: React.FC = () => {
  return (
    <LayoutBaseDePagina>
      <Box>
        <Box
          width={'100%'}
          height="450px"
          sx={{
            objectFit: 'cover',
          }}
          component="img"
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
        />
      </Box>

      <Box display="flex" flexDirection={'column'} gap={5} mt={5}>
        <Typography textAlign={'center'}>
          Something powerful happens when we gather around a table together. We
          become connected to each other, to the food on the table, to the
          producers who grew, raised, and crafted the delicious food, and
          connected to the land where it came from. Gathering around a table
          together creates community. On a mission of Creating Community Through
          Food, Bi-Rite strives every day to cultivate meaningful relationships
          with each member at our proverbial table. We believe it’s our
          responsibility to cultivate an organization that helps our community –
          you, our guests, our producers and partners, our staff, and our planet
          – thrive for generations to come. That might sound overly ambitious.
          But with community values of Lead with LOVE, Pursue with PASSION, and
          Act with INTEGRITY, we’re up for the challenge. We hope you’ll join us
          on the journey to build a sustaining, vibrant food community.
        </Typography>
      </Box>
    </LayoutBaseDePagina>
  );
};
