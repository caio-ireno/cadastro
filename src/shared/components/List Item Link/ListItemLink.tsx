import {
  ListItemButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

interface ListItemLinkProps {
  label: string;
  to: string;
}
export const ListItemLink: React.FC<ListItemLinkProps> = ({ to, label }) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const resolvePath = useResolvedPath(to);
  const match = useMatch({ path: resolvePath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
  };
  return (
    <ListItemButton
      sx={{
        ':hover': {
          backgroundColor: '#AED6F1',
          borderRadius: '10px',
        },
        borderRadius: '10px',
        border: '2px solid',
      }}
      selected={!!match}
      onClick={handleClick}
    >
      <Typography fontSize={mdDown ? 15 : 25}>{label}</Typography>
    </ListItemButton>
  );
};
