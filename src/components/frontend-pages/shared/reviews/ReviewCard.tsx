import React from 'react';
import { Box, Typography, Stack, Avatar } from '@mui/material';
import PlaceholderAvatar from 'src/components/shared/PlaceholderAvatar';

const ReviewCard = ({ review, theme, customizer, isRtl }) => {
  // Fix the property name inconsistency (use 'image' instead of 'img')
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {review.image ? (
        <Avatar
          src={review.image}
          alt={review.name}
          sx={{
            width: { xs: 42, sm: 48 },
            height: { xs: 42, sm: 48 },
            border: '2px solid',
            borderColor: 'primary.main',
            // Add fallback background color in case image fails to load
            bgcolor: theme.palette.primary.light
          }}
        >
          {/* Fallback content - first letter of name */}
          {review.name.charAt(0)}
        </Avatar>
      ) : (
        <PlaceholderAvatar name={review.name} />
      )}
      {/* ...rest of the component... */}
    </Stack>
  );
};

export default ReviewCard;