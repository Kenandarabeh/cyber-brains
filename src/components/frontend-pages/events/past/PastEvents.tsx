import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  useTheme, 
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogContent,
  Stack // Add Stack import
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  IconCalendar, 
  IconMapPin, 
  IconUsers, 
  IconPhoto, 
  IconTrophy,
  IconPlayerPlay,
  IconX
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

// Import local images
import defaultImage from 'src/assets/images/gallery/image 2.png';
import exhibitionImage from 'src/assets/images/gallery/image 2.png';
import workshopImage from 'src/assets/images/gallery/image 2.png';
import documentaryImage from 'src/assets/images/gallery/image 2.png';
import gallery1 from 'src/assets/images/gallery/image 2.png';
import gallery2 from 'src/assets/images/gallery/image 2.png';
import gallery3 from 'src/assets/images/gallery/image 2.png';
import gallery4 from 'src/assets/images/gallery/image 2.png';
import gallery5 from 'src/assets/images/gallery/image 2.png';
import gallery6 from 'src/assets/images/gallery/image 2.png';
import gallery7 from 'src/assets/images/gallery/image 2.png';
import gallery8 from 'src/assets/images/gallery/image 2.png';
import gallery9 from 'src/assets/images/gallery/image 2.png';


import formation_3_1 from 'src/assets/images/gallery/formation_3_1.jpg';
import formation_3_2 from 'src/assets/images/gallery/formation_3_2.jpg';
import formation_3_3 from 'src/assets/images/gallery/formation_3_3.jpg';
import formation_3_4 from 'src/assets/images/gallery/formation_3_4.jpg';
import formation_3_5 from 'src/assets/images/gallery/formation_3_5.jpg';
import formation_3_6 from 'src/assets/images/gallery/formation_3_6.jpg';
import formation_3_7 from 'src/assets/images/gallery/formation_3_7.jpg';

import formation_1_1 from 'src/assets/images/gallery/formation_1_1.jpg';
import formation_1_2 from 'src/assets/images/gallery/formation_1_2.jpg';
import formation_1_3 from 'src/assets/images/gallery/formation_1_3.jpg';
import formation_1_4 from 'src/assets/images/gallery/formation_1_4.jpg';
import formation_1_5 from 'src/assets/images/gallery/formation_1_5.jpg';


import formation_2_1 from 'src/assets/images/gallery/formation_2_1.jpg';
import formation_2_2 from 'src/assets/images/gallery/formation_2_2.jpg';
import formation_2_3 from 'src/assets/images/gallery/formation_2_3.jpg';
import formation_2_4 from 'src/assets/images/gallery/formation_2_4.jpg';
import formation_2_5 from 'src/assets/images/gallery/formation_2_5.jpg';
import formation_2_6 from 'src/assets/images/gallery/formation_2_6.jpg';

const pastEvents = [
  {
    id: 6,
    title: "التنشيط على الركح",
    titleKey: "pastEvents.events.stageAnimation.title",
    date: "2024-12-15",
    location: "القطب الأول - قاعة الأساتذة",
    locationKey: "pastEvents.events.stageAnimation.location",
    time: "10:00",
    attendees: 35,
    category: "Training",
    coverImage: formation_2_3,
    instructors: ["أنس محمدي"],
    guests: ["قندوز عديلة"],
    supervisors: ["أيمن لحمر", "أنفال نقاز"],
    components: [
      { 
        name: "نظري", 
        nameKey: "pastEvents.events.stageAnimation.components.theoretical",
        description: "تقديم نصائح ومفهوم التنشيط وأساسياته وخبرات المنشط في المجال", 
        descriptionKey: "pastEvents.events.stageAnimation.components.theoreticalDesc"
      },
      { 
        name: "تطبيقي", 
        nameKey: "pastEvents.events.stageAnimation.components.practical",
        description: "اكتشاف المواهب في التنشيط وتكوينها من خلال التطبيق المباشر", 
        descriptionKey: "pastEvents.events.stageAnimation.components.practicalDesc" 
      }
    ],
    highlights: [
      { icon: IconUsers, text: "instructorsCount", count: 1 },
      { icon: IconPhoto, text: "componentsCount", count: 2 },
      { icon: IconTrophy, text: "certificateAwarded" }
    ],
    gallery: [
      { src: formation_2_4, caption: "دورة التنشيط على الركح", captionKey: "pastEvents.events.stageAnimation.gallery.image1" },
      { src: formation_2_3, caption: "الجانب النظري للتنشيط", captionKey: "pastEvents.events.stageAnimation.gallery.image2" },
      { src: formation_2_5, caption: "مشاركة الطلبة", captionKey: "pastEvents.events.stageAnimation.gallery.image3" },
      { src: formation_2_6, caption: "الجانب التطبيقي", captionKey: "pastEvents.events.stageAnimation.gallery.image4" },
      { src: formation_2_1, caption: "تكريم المدرب أنس محمدي", captionKey: "pastEvents.events.stageAnimation.gallery.image5" }
    ],
    description: "نظم نادي الإعلامي الصاعد صبيحة يوم الأحد 15ديسمبر2024 على الساعة 10:00 بالقطب الأول بقاعة الأساتذة دورة تكوينية في مجال التنشيط على الركح، تحت تأطير \"أنس محمدي\" المؤسس الوطني لنادي الإعلامي الصاعد-النعامة وبحضور الإعلامية \"قندوز عديلة\" من المسرح الجهوي النعامة وتحت إشراف رئيس النادي \"أيمن لحمر\" ومسؤولة لجنة الدورات التكوينية \"أنفال نقاز\". حيث تمثلت فعاليات هذه الدورة في تقديم نصائح ومفهوم التنشيط وأساسياته حيث شارك معنا المنشط خبرته في المجال إضافة إلى التشجيع و بث الثقة في المشاركين في الدورة من أعضاء النادي خاصة وطلبة المركز عامة حيث تضمنت هذه الدورة جانبين (الجانب النظري والجانب التطبيقي) من أجل اكتشاف المواهب في التنشيط وتكوينها. وفي الختام اختتمت هذه الدورة ببعض الإرشادات والتوجيهات أين تم كذالك تكريم المؤطر لهذه الدورة \"أنس محمدي\" من قبل النادي والحضور المشاركين في الدورة فالشكر موصول لكل القائمين والمشرفين على هذه الدورة.",
    descriptionKey: "pastEvents.events.stageAnimation.description",
    reporter: "إلياس لسهل"
  },
  {
    id: 5,
    title: "أساسيات الكاميرا",
    titleKey: "pastEvents.events.photographyBasics.title",
    date: "2024-06-01", // تاريخ تقريبي، يمكنك تحديثه لاحقاً
    location: "دار المقاولاتية للمركز الجامعي صالحي أحمد بالنعامة",
    locationKey: "pastEvents.events.photographyBasics.location",
    attendees: 25,
    category: "Training",
    coverImage: formation_1_1,
    instructors: ["أحمد رقاد"],
    supervisors: ["مجاد أصالة"],
    components: [
      { 
        name: "نظري", 
        nameKey: "pastEvents.events.photographyBasics.components.theoretical",
        description: "أساسيات التصوير الفوتوغرافي والكاميرا من الناحية النظرية", 
        descriptionKey: "pastEvents.events.photographyBasics.components.theoreticalDesc"
      },
      { 
        name: "تطبيقي", 
        nameKey: "pastEvents.events.photographyBasics.components.practical",
        description: "تطبيق عملي على استخدام الكاميرا وأخذ الصور", 
        descriptionKey: "pastEvents.events.photographyBasics.components.practicalDesc" 
      }
    ],
    highlights: [
      { icon: IconUsers, text: "instructorsCount", count: 1 },
      { icon: IconPhoto, text: "componentsCount", count: 2 },
      { icon: IconTrophy, text: "certificateAwarded" }
    ],
    gallery: [
      { src: formation_1_1, caption: "تدريب أساسيات الكاميرا", captionKey: "pastEvents.events.photographyBasics.gallery.image1" },
      { src: formation_1_5, caption: "الشرح النظري للتصوير", captionKey: "pastEvents.events.photographyBasics.gallery.image2" },
      { src: formation_1_2, caption: "التطبيق العملي", captionKey: "pastEvents.events.photographyBasics.gallery.image3" },
      { src: formation_1_4, caption: "المشاركات في الدورة", captionKey: "pastEvents.events.photographyBasics.gallery.image4" },
      { src: formation_1_3, caption: "تكريم المدرب أحمد رقاد", captionKey: "pastEvents.events.photographyBasics.gallery.image5" }
    ],
    description: "حظي عضوات نادي الإعلامي الصاعد بدورة تكوينية في مجال التصوير الفوتوغرافي الموسومة بـ \"أساسيات الكاميرا\" من تأطير الأستاذ القدير \"أحمد رقاد\" وبإشراف من الناشطة مسؤولة لجنة التدريب والتكوين \"مجاد أصالة\". تميزت الدورة بالتركيز على الجانب التطبيقي أساساً دون إهمال الجانب النظري حيث كان لبنات النادي وصحفيات المستقبل الفرصة من أجل تعلم التصوير بالكاميرا وأساسياتها. نُظِمت الدورة بدار المقاولاتية للمركز الجامعي صالحي أحمد بالنعامة. وفي ختام الدورة تم تكريم الأستاذ المؤطر للدورة نظير مجهوداته في سبيل المعرفة والتعلم لأسرة النادي في المجال كما تم تقديم بعض النصائح والتأكيد على مواصلة التطبيق في دورات لاحقة.",
    descriptionKey: "pastEvents.events.photographyBasics.description",
    reporter: "بوعافية ضحى",
    photographer: "مالكي رفيقة"
  },
  {
    id: 4,
    title: "التقديم الاذاعي و التليفزيوني و الاعداد الصحفي", // Restored original Arabic title
    titleKey: "pastEvents.events.radioTvPresentation.title", // Keep translation key for other languages
    date: "2024-12-03",
    location: "القطب الاول - قاعة الاساتذة", // Restored original Arabic location
    locationKey: "pastEvents.events.radioTvPresentation.location", // Keep translation key for other languages
    time: "13:30",
    attendees: 20,
    category: "Training",
    coverImage: formation_3_1,
    instructors: ["فتحي عيادة", "سماعي لخضر"],
    guests: ["طيبي سفيان", "عز الدين بن خدومة", "د. بودواية مبخوت"],
    components: [
      { 
        name: "نظري", // Restored original Arabic component name
        nameKey: "pastEvents.events.radioTvPresentation.components.theoretical",
        description: "اكتساب الاعضاء مجموعة من توجيهات والمصطلحات الإعلامية في التقديم و التنشيط الاذاعي و التليفزيوني", // Restored original description
        descriptionKey: "pastEvents.events.radioTvPresentation.components.theoreticalDesc"
      },
      { 
        name: "تطبيقي", // Restored original Arabic component name
        nameKey: "pastEvents.events.radioTvPresentation.components.practical",
        description: "التطبيق المباشر للأعضاء في مجال تقديم نشرة الأخبار و تقديم برنامج اضافة الى التعليق الصوتي", // Restored original description
        descriptionKey: "pastEvents.events.radioTvPresentation.components.practicalDesc"
      }
    ],
    highlights: [
      { icon: IconUsers, text: "instructorsCount", count: 2 },
      { icon: IconPhoto, text: "componentsCount", count: 2 }    ],
    gallery: [
      { src: formation_3_4, caption: "دورة التقديم الاذاعي والتلفزيوني", captionKey: "pastEvents.events.radioTvPresentation.gallery.image1" },
      { src: formation_3_6, caption: "الجانب النظري", captionKey: "pastEvents.events.radioTvPresentation.gallery.image2" },
      { src: formation_3_7, caption: "الجانب التطبيقي", captionKey: "pastEvents.events.radioTvPresentation.gallery.image4" },
    ],
    description: "نظم نادينا دورة تكوينية في مجال التقديم الاذاعي و التليفزيوني و الاعداد الصحفي تحت تأطير الأستاذين الكريمين فتحي عيادة وسماعي لخضر وبحضور كل من طيبي سفيان وعز الدين بن خدومة حيث تخللت الدورة زيارة مدير معهد العلوم الانسانية والإجتماعية الدكتور بودواية مبخوت و الذي شرفنا بكلماته الراقية حول النادي الاعلامي الصاعد وقدم الدعم والتحفيز لأعضاءه وثمن جهودهم المبذولة.", // Restored original description
    descriptionKey: "pastEvents.events.radioTvPresentation.description" 
  }
];

const ImageGallery = ({ images, isOpen, onClose }) => {
  const theme = useTheme();
  const customizer = useSelector((state: any) => state.customizer);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  // إضافة دالة محلية للترجمة داخل المكون
  const getLocalizedCaption = (image) => {
    // استخدام مفتاح الترجمة إذا كان موجودًا
    if (image.captionKey && t(image.captionKey) !== image.captionKey) {
      return t(image.captionKey);
    }
    // الاعتماد على النص الأصلي كخيار بديل
    return image.caption || '';
  };

  // Handler for image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImage;
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogContent
        sx={{
          p: 0,
          bgcolor: customizer.activeMode === 'dark' ? 'grey.900' : 'background.paper',
          position: 'relative',
          direction: isRTL ? 'rtl' : 'ltr'
        }}
      >
        {/* Enhanced Close Button */}
        <IconButton
          onClick={onClose}
          aria-label={t('pastEvents.actions.close')}
          sx={{
            position: 'absolute',
            [isRTL ? 'left' : 'right']: 16,
            top: 16,
            color: 'white',
            bgcolor: 'rgba(0,0,0,0.7)',
            border: '2px solid white',
            zIndex: 10,
            width: 40,
            height: 40,
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            '&:hover': {
              bgcolor: theme.palette.error.main,
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease'
          }}
        >
          <IconX size={24} />
        </IconButton>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 2,
            p: 2
          }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  paddingTop: '75%',
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
              >
                <img
                  src={image.src}
                  alt={getLocalizedCaption(image)}
                  onError={handleImageError}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 2,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))'
                  }}
                >
                  <Typography variant="body2" color="white">
                    {getLocalizedCaption(image)}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const EventCard = ({ event }) => {
  const theme = useTheme();
  const customizer = useSelector((state: any) => state.customizer);
  const [isGalleryOpen, setIsGalleryOpen] = React.useState(false);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const language = i18n.language;

  // إضافة دوال محلية للترجمة داخل المكون
  const getEventTitle = () => {
    return event.titleKey && t(event.titleKey) !== event.titleKey ? t(event.titleKey) : event.title || '';
  };

  const getEventLocation = () => {
    return event.locationKey && t(event.locationKey) !== event.locationKey ? t(event.locationKey) : event.location || '';
  };

  const getEventDescription = () => {
    return event.descriptionKey && t(event.descriptionKey) !== event.descriptionKey ? t(event.descriptionKey) : event.description || '';
  };

  // Handler for image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImage;
  };

  // Enhanced translation function for highlight text that uses proper i18next syntax
  const getHighlightText = (highlight) => {
    if (!highlight) return '';
    
    const { text, count, date, time } = highlight;
    
    try {
      // Handle different translation types
      if (text === "instructorsCount" || text === "componentsCount") {
        return t(`pastEvents.${text}`, { count });
      } else if (text === "dateTime" && date && time) {
        return t('pastEvents.highlightTexts.dateTime', { date, time });
      } else if (count !== undefined) {
        return t(`pastEvents.highlightTexts.${text}`, { count });
      } else {
        return t(`pastEvents.highlightTexts.${text}`);
      }
    } catch (error) {
      console.warn(`Translation key not found: ${text}`, error);
      return text; // Fallback to the raw text if translation fails
    }
  };

  // Get category translation
  const getCategoryTranslation = (category) => {
    try {
      const categoryKey = category.toLowerCase();
      return t(`pastEvents.categories.${categoryKey}`);
    } catch (error) {
      console.warn(`Category translation not found: ${category}`, error);
      return category; // Fallback to the raw category if translation fails
    }
  };

  // Get translated event property (title, location, description)
  const getEventProperty = (event, propertyKey, defaultProperty) => {
    if (propertyKey && t(propertyKey) !== propertyKey) {
      return t(propertyKey);
    }
    return defaultProperty || '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Box
        sx={{
          bgcolor: customizer.activeMode === 'dark' 
            ? 'rgba(0,0,0,0.6)' 
            : 'rgba(255,255,255,0.8)',
          borderRadius: 2,
          overflow: 'hidden',
          backdropFilter: 'blur(20px)',
          boxShadow: customizer.activeMode === 'dark'
            ? '0 8px 32px rgba(0,0,0,0.4)'
            : '0 8px 32px rgba(255,255,255,0.2)',
          transition: 'all 0.4s ease',
          border: '1px solid',
          borderColor: customizer.activeMode === 'dark'
            ? 'rgba(255,255,255,0.1)'
            : 'rgba(255,255,255,0.3)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: customizer.activeMode === 'dark'
              ? '0 12px 40px rgba(0,0,0,0.6)'
              : '0 12px 40px rgba(0,0,0,0.15)',
            borderColor: theme.palette.primary.main,
          },
          direction: isRTL ? 'rtl' : 'ltr',
          textAlign: isRTL ? 'right' : 'left',
          '& .MuiChip-root': {
            mr: isRTL ? 0 : 1,
            ml: isRTL ? 1 : 0
          }
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: 280,
            '&:hover .event-overlay': {
              opacity: 1
            }
          }}
        >
          {/* Use IMG tag instead of background image */}
          <img
            src={event.coverImage}
            alt={event.title}
            onError={handleImageError}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s ease',
            }}
            className="event-image"
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
          
          {/* Gradient overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%)',
              zIndex: 1
            }}
          />

          <Box
            className="event-overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0,0,0,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              zIndex: 2
            }}
          >
            <Stack direction="row" spacing={2} sx={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <Tooltip title={t('pastEvents.actions.viewGallery')}>
                <IconButton
                  onClick={() => setIsGalleryOpen(true)}
                  sx={{
                    color: 'white',
                    bgcolor: 'primary.main',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                >
                  <IconPhoto size={24} />
                </IconButton>
              </Tooltip>
              {event.videoUrl && (
                <Tooltip title={t('pastEvents.actions.watchVideo')}>
                  <IconButton
                    component="a"
                    href={event.videoUrl}
                    target="_blank"
                    sx={{
                      color: 'white',
                      bgcolor: 'error.main',
                      '&:hover': { bgcolor: 'error.dark' }
                    }}
                  >
                    <IconPlayerPlay size={24} />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Box>

          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 3,
              zIndex: 3
            }}
          >
            <Chip
              label={getCategoryTranslation(event.category)}
              color="primary"
              size="small"
              sx={{
                mb: 1,
                bgcolor: 'primary.main',
                color: 'white'
              }}
            />
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                fontWeight: 600,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              {getEventTitle()}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <IconCalendar size={18} color={theme.palette.primary.main} />
                <Typography variant="body2" color="text.secondary">
                  {`${t('pastEvents.eventInfo.date')}: ${new Date(event.date).toLocaleDateString(i18n.language)}`}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <IconMapPin size={18} color={theme.palette.primary.main} />
                <Typography variant="body2" color="text.secondary">
                  {`${t('pastEvents.eventInfo.location')}: ${getEventLocation()}`}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <IconUsers size={18} color={theme.palette.primary.main} />
                <Typography variant="body2" color="text.secondary">
                  {`${t('pastEvents.eventInfo.attendees')}: ${event.attendees}`}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box mt={3}>
            <Typography variant="subtitle2" color="text.primary" gutterBottom>
              {t('pastEvents.eventInfo.highlights')}:
            </Typography>
            <Grid container spacing={1}>
              {event.highlights.map((highlight, index) => (
                <Grid item xs={12} key={index}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      flexDirection: isRTL ? 'row-reverse' : 'row'
                    }}
                  >
                    <highlight.icon size={18} color={theme.palette.primary.main} />
                    {getHighlightText(highlight)}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>

          {event.gallery && (
            <Box mt={3}>
              <Typography variant="subtitle2" color="text.primary" gutterBottom>
                {t('pastEvents.eventInfo.gallery')}:
              </Typography>
              <Grid container spacing={1}>
                {event.gallery.slice(0, 3).map((image, index) => (
                  <Grid item xs={4} key={index}>
                    <Box
                      sx={{
                        width: '100%',
                        paddingTop: '100%',
                        position: 'relative',
                        borderRadius: 1,
                        overflow: 'hidden'
                      }}
                    >
                      <img
                        src={image.src}
                        alt={image.captionKey && t(image.captionKey) !== image.captionKey ? t(image.captionKey) : image.caption || ''}
                        onError={handleImageError}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Box>

      <ImageGallery 
        images={event.gallery}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </motion.div>
  );
};

const PastEvents = () => {
  const theme = useTheme();
  const customizer = useSelector((state: any) => state.customizer);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        bgcolor: 'transparent',
        backgroundImage: customizer.activeMode === 'dark'
          ? 'radial-gradient(circle at 50% 50%, rgba(37, 38, 43, 0.95) 0%, rgba(0, 0, 0, 0.98) 100%)'
          : 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.95) 0%, rgba(240, 240, 245, 0.95) 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: customizer.activeMode === 'dark'
            ? 'url("/images/patterns/dark-pattern.png") repeat'
            : 'url("/images/patterns/light-pattern.png") repeat',
          opacity: 0.03,
          zIndex: 1
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: 'blur(40px)',
          zIndex: 2
        },
        direction: isRTL ? 'rtl' : 'ltr'
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative',
          zIndex: 3
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            align='center'
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 800,
              mb: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {t('pastEvents.title')}
          </Typography>
          <Typography
            variant="h5"
            align='center'

            sx={{
              color: customizer.activeMode === 'dark' ? 'grey.400' : 'grey.600',
              maxWidth: '600px',
              mx: 'auto',
              mb: 8
            }}
          >
            {t('pastEvents.subtitle')}
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {pastEvents.map((event) => (
            <Grid item xs={12} md={4} key={event.id}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PastEvents;
