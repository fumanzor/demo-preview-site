// import { useState } from 'react'
import './App.css'
import Home from './components/Home/Home'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
// import Carousel from './components/Amplience/carousel/Carousel'
import AmplienceContent from './components/Amplience';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AmpxModulePreview from './components/Amplience/ModulePreview';

const hubname = 'uasandbox'
// const key = 'ua-poc-homepage'
const client = new ApolloClient({
  uri: `https://${hubname}.cdn.content.amplience.net/graphql`, // Replace with your API endpoint
  cache: new InMemoryCache
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="ampx" element={<AmplienceContent />} />
      <Route path="ampx/module-preview" element={<AmpxModulePreview />} />
    </Route>
  )
)

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

const AppWrapper = () => (
  <ApolloProvider client={client}>
    <Header/>
    <App />
    <Footer/>
  </ApolloProvider>
);

export default AppWrapper
