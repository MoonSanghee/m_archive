import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../components/Layout";
import LoginPage from "../pages/Auth/Login";
import { TestIm, TestJo, TestMoon, TestKim, TestSeo, TestKim2 } from "../pages/Test";
//import {TestSeo } from '../pages/Test';
import { StartPage } from "../pages/Auth";
import Feedback from "../pages/Test/Feedback";
import MyPageLayout from "../components/Layout/MyPageLayout";
//import {ProfilePage} from '../pages/MyPage/';
import Profile from "../pages/MyPage/Profile";
import Register from "../pages/Auth/Register";
import { HomePage } from '../pages';


const router = (
  <Route path="/">
    {<Route index element={<StartPage />} />}
    <Route path="test">
      <Route path="im" element={<TestIm />} />
      <Route path="moon" element={<TestMoon />} />
      <Route path="kim" element={<TestKim />} />
      <Route path="kim2" element={<TestKim2 />} />
      <Route path="jo" element={<TestJo />} />
      <Route path="seo" element={<TestSeo />} />
      <Route path="feedback" element={<Feedback />} />
    </Route>

    <Route path="login" element={<LoginPage />} />
    <Route path="register" element={<Register />} />
    {/* 
       <Route path="feedback" element={<Feedback/>}/>
      <Route path="register" element={<RegisterPage/>}/> */}

      <Route path="home" element={<Layout/>}>
          
        <Route path="movies" element={<HomePage/>}>
         {/*<Route path=":id" element={<MovieDetailPage/>}/>
         */} 
        </Route>
    
        <Route path="mypage" element={<MyPageLayout/>}>
          
          <Route path="profile" element={<Profile/>}/>
          {/*

          <Route path="like" element={<LikePage/>}/>
          <Route path="review" element={<ReviewPage/>}/>
          <Route path="faq" element={<FAQ/>}/>
  <Route path=":id" element={<UserPage/>}/>*/}
      </Route>
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
);

const rootRouter = createBrowserRouter(createRoutesFromElements(router));

export default rootRouter;
