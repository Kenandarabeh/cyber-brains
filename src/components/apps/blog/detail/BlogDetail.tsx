import React from 'react';
import { Box, Typography, Container, Divider, Chip, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

interface BlogDetailProps {
  post?: {
    title?: string;
    subtitle?: string;
    content?: string;
    coverImg?: string;
    author?: {
      name?: string;
      avatar?: string;
    };
    date?: string;
    tags?: string[];
  };
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post = {} }) => {
  const customizer = useSelector((state: any) => state.customizer);
  
  const {
    title = 'Blog Post Title',
    subtitle = 'Blog Post Subtitle',
    content = 'Blog content goes here...',
    coverImg = '',
    author = { name: 'Author Name', avatar: '' },
    date = new Date().toLocaleDateString(),
    tags = ['Tag1', 'Tag2']
  } = post;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom>
          {title}
        </Typography>
        
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {subtitle}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={author.avatar}
            alt={author.name}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {author.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {date}
            </Typography>
          </Box>
        </Box>
        
        {coverImg && (
          <Box
            component="img"
            src={coverImg}
            alt={title}
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 1,
              mb: 3,
            }}
          />
        )}
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          {content}
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {tags.map((tag, index) => (
            <Chip key={index} label={tag} size="small" />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default BlogDetail;
