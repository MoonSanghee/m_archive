import {createBrowserRouter, 
  createRoutesFromElements, 
  Route, } from 'react-router-dom';
import { TestIm,TestJo,TestMoon,TestKim,TestSeo } from '../pages/Test';
//import {TestSeo } from '../pages/Test';

const router = (
    <Route path="/">
      <Route path='test'>
         <Route path='im' element={<TestIm/>}/>
          <Route path='moon' element={<TestMoon/>}/>
          <Route path='kim' element={<TestKim/>}/>
          <Route path='jo' element={<TestJo/>}/>
          <Route path='seo' element={<TestSeo/>}/>
      </Route>
    </Route>
)

const rootRouter = createBrowserRouter(createRoutesFromElements(router));

export default rootRouter;