import { Box, Typography, IconButton, Stack, Avatar, useTheme, Paper } from '@mui/material';
import { LinkedIn, Twitter, Instagram, GitHub } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

interface MemberCardProps {
  name: string;
  role: string;
  image: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
  };
}

const MemberCard = ({ name, role, image, social }: MemberCardProps) => {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: theme.palette.primary.main,
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Avatar Section */}
        <Avatar
          src={image}
          alt={name}
          sx={{
            width: 80,
            height: 80,
            border: `3px solid ${theme.palette.primary.main}`,
            boxShadow: `0 0 0 4px ${theme.palette.background.paper}`,
          }}
        />

        {/* Info Section */}
        <Box sx={{ textAlign: 'center', width: '100%' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 0.5,
              color: theme.palette.text.primary,
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 500,
            }}
          >
            {role}
          </Typography>
        </Box>

        {/* Social Links */}
        {social && (
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            sx={{
              width: '100%',
              pt: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            {Object.entries(social).map(([platform, url]) => (
              <IconButton
                key={platform}
                size="small"
                href={url}
                target="_blank"
                sx={{
                  color: theme.palette.text.secondary,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: theme.palette.primary.main,
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                {platform === 'github' && <GitHub fontSize="small" />}
                {platform === 'linkedin' && <LinkedIn fontSize="small" />}
                {platform === 'twitter' && <Twitter fontSize="small" />}
                {platform === 'instagram' && <Instagram fontSize="small" />}
              </IconButton>
            ))}
          </Stack>
        )}
      </Box>
    </Paper>
  );
};

export default MemberCard;
