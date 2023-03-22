import {createBrowserRouter, 
  createRoutesFromElements, 
  Route, } from 'react-router-dom';
import Layout from '../components/Layout';
import LoginPage from '../pages/Auth/Login';
import { TestIm,TestJo,TestMoon,TestKim,TestSeo } from '../pages/Test';
//import {TestSeo } from '../pages/Test';

const router = (
    <Route path="/">
      {/*
      <Route index element = {<StartPage/>}/>
*/}
      <Route path='test'>
         <Route path='im' element={<TestIm/>}/>
          <Route path='moon' element={<TestMoon/>}/>
          <Route path='kim' element={<TestKim/>}/>
          <Route path='jo' element={<TestJo/>}/>
          <Route path='seo' element={<TestSeo/>}/>
      </Route>
      
      <Route path="login" element={<LoginPage/>}/>
      {/* <Route path="register" element={<RegisterPage/>}/> */}

      <Route path="home" element={<Layout/>}>
          {/*
        <Route index element={<MovieHome/>}>
          <Route path=":id" element={<MovieDetailPage/>}/>
        </Route>
      
        <Route path="mypage" >
          <Route index element={<ProfilePage/>}/>
          <Route path="like" element={<LikePage/>}/>
          <Route path="review" element={<ReviewPage/>}/>
          <Route path="faq" element={<FAQ/>}/>
          <Route path=":id" element={<UserPage/>}/>
        </Route>
      */}
      </Route>
      {/*
      <Route path="admin">
        <Route index element={<ManageMoviesPage/>}>
          <Route path="addMovie" element={<AddMoviePage/>}>
        </Route>
        <Route path="manageReviews" element={<ManageReviewsPage/>}/>
        <Route path="manageUsers" element={<ManageUsersPage/>}/>
        <Route path="manageFAQs" element={<ManageFAQsPage/>}/>
      </Route>
      */}
    </Route>
)

const rootRouter = createBrowserRouter(createRoutesFromElements(router));

export default rootRouter;