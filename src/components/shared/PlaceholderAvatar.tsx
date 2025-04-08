import React from 'react';
import { Avatar, useTheme } from '@mui/material';

interface PlaceholderAvatarProps {
  name: string;
  size?: number;
}

const PlaceholderAvatar: React.FC<PlaceholderAvatarProps> = ({ name, size = 48 }) => {
  const theme = useTheme();
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

  return (
    <Avatar
      sx={{
        width: size,
        height: size,
        backgroundColor: theme.palette.primary.main,
        fontSize: size / 2.5
      }}
    >
      {initials}
    </Avatar>
  );
};

export default PlaceholderAvatar;
