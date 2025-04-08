// إنشاء كائن كامل يجمع كل ملفات الترجمة
import general from './general.json';
import navigation from './navigation.json';
import forms from './forms.json';
import hpHeader from './HpHeader.json';
import home from './home.json';
import headerBanner from './HeaderBanner.json';
import sponsors from './sponsors.json';
import activities from './activities.json';
import reviews from './reviews.json';
import faq from './faq.json';
import footer from './footer.json';
import about from './about.json';
import whoWeAre from './whoWeAre.json';
import ourMission from './ourMission.json';
import features from './features.json';
import commitments from './commitments.json';
import committees from './committees.json';
import events from './events.json';
import eventCategories from './eventCategories.json';
import upcomingEvents from './upcomingEvents.json';
import pastEvents from './pastEvents.json';
import team from './team.json';
import leadership from './leadership.json';
import leadershipCarousel from './leadershipCarousel.json';
import supervisors from './supervisors.json';
import committeeMembers from './committeeMembers.json';
import join from './join.json';
import committeeForm from './committeeForm.json';
import contact from './contact.json';
import contactBanner from './contactBanner.json';
import contactForm from './contactForm.json';
import leaderDetail from './leaderDetail.json';
import alumniLeaders from './alumniLeaders.json';
import supervisorDetail from './supervisorDetail.json';
import error from './error.json';
import projects from './projects.json';
import discord from './discord.json';
import pageBanner from './pageBanner.json';
import contactAddress from './contactAddress.json';

// تجميع الترجمات في كائن منفصل بدلاً من الدمج المسطح
const translations = {
  ...general,
  home: {
    ...home
  },
  navigation: {
    ...navigation
  },
  forms: {
    ...forms
  },
  header: {
    ...hpHeader
  },
  HeaderBanner: {
    ...headerBanner
  },
  sponsors: {
    ...sponsors
  },
  activities: {
    ...activities
  },
  reviews: {
    ...reviews
  },
  faq: {
    ...faq
  },
  footer: {
    ...footer
  },
  about: {
    ...about
  },
  whoWeAre: {
    ...whoWeAre
  },
  ourMission: {
    ...ourMission
  },
  features: {
    ...features
  },
  commitments: {
    ...commitments
  },
  committees: {
    ...committees
  },
  events: {
    ...events
  },
  eventCategories: {
    ...eventCategories
  },
  upcomingEvents: {
    ...upcomingEvents
  },  pastEvents: {
    ...pastEvents
  },
  team: {
    ...team
  },
  leadership: {
    ...leadership
  },
  leadershipCarousel: {
    ...leadershipCarousel
  },
  supervisors: {
    ...supervisors
  },
  committeeMembers: {
    ...committeeMembers
  },
  join: {
    ...join
  },
  committeeForm: {
    ...committeeForm
  },
  contact: {
    ...contact
  },
  contactBanner: {
    ...contactBanner
  },
  contactForm: {
    ...contactForm
  },
  leaderDetail: {
    ...leaderDetail
  },
  alumniLeaders: {
    ...alumniLeaders
  },
  supervisorDetail: {
    ...supervisorDetail
  },
  error: {
    ...error
  },
  projects: {
    ...projects
  },
  discord: {
    ...discord
  },
  pageBanner: {
    ...pageBanner
  },
  contactAddress: {
    ...contactAddress
  }
};

export default translations;
