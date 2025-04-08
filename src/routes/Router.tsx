// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/blank/loadable/Loadable';

/* ***Layouts**** */
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

const Error = Loadable(lazy(() => import('../views/pages/Error')));


// front end pages
const Homepage = Loadable(lazy(() => import('../views/pages/Homepage')));
const About = Loadable(lazy(() => import('../views/pages/About')));
const Contact = Loadable(lazy(() => import('../views/pages/Contact')));
const Portfolio = Loadable(lazy(() => import('../views/pages/Portfolio')));
const PagePricing = Loadable(lazy(() => import('../views/pages/Pricing')));
const BlogPage = Loadable(lazy(() => import('../views/pages/Blog')));
const BlogPost = Loadable(lazy(() => import('../views/pages/BlogPost')));
const Team = Loadable(lazy(() => import('../views/pages/Team')));
const Events = Loadable(lazy(() => import('../views/pages/Events')));
const Join = Loadable(lazy(() => import('../views/pages/Join')));
const LeaderDetail = Loadable(lazy(() => import('../views/pages/LeaderDetail')));
const SupervisorDetail = Loadable(lazy(() => import('../views/pages/SupervisorDetail')));

const Router = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/', element: <Navigate to="/home" /> },
      { path: '/home', exact: true, element: <Homepage /> },
      { path: '/about', exact: true, element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/join', element: <Join /> },
      { path: '/portfolio', element: <Portfolio /> },
      { path: '/pricing', element: <PagePricing /> },
      { path: '/blog', element: <BlogPage /> },
      { path: '/blog/detail/:id', element: <BlogPost /> },
      { path: '/auth/404', element: <Error /> },
      { path: '/team', element: <Team /> },
      { path: '/leader/:id', element: <LeaderDetail /> },
      { path: '/supervisor/:id', element: <SupervisorDetail /> },  // إضافة مسار جديد
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  }
];

export default Router;
