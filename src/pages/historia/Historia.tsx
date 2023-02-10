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
          src="https://scontent.fsod2-1.fna.fbcdn.net/v/t31.18172-8/19956951_795657103925733_8372376656500984706_o.jpg?_nc_cat=110&ccb=1-7&_nc_sid=e3f864&_nc_ohc=wjFxXYh-lWkAX-hEcBP&tn=O3EcyzBfwA2FUv1M&_nc_ht=scontent.fsod2-1.fna&oh=00_AfDYyoXVRBZB7lnwPN1JhizZOpV-TrpqIIp80JReddnZ1g&oe=640A25E0"
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
