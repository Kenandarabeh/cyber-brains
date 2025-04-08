import React from 'react';
import PageBanner from '../../shared/page-banner/PageBanner';
import AboutBgImage from 'src/assets/images/about/about-banner.jpg';

const AboutBanner = () => {
  return (
    <PageBanner
      title="About Us"
      subtitle="Empowering Student Voices Through Media Excellence"
      path={['Home', 'About']}
      image={AboutBgImage}
      pattern={true}
    />
  );
};

export default AboutBanner;
