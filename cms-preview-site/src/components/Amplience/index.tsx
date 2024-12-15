/* eslint-disable @typescript-eslint/no-explicit-any */
// Amplience.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Carousel from './carousel/Carousel';
import HeroMini from './heroMini/HeroMini';


const GET_DATA = gql`
  query($deliveryKey: String) {
    page(deliveryKey: $deliveryKey) {
      slots {
      ... on Banner {
        rawJson {
            content
        }
      }
      ... on Carousel {
          rawJson {
            content
          }
        }
      }
    }
  }
`;

const urlParams = new URLSearchParams(window.location.search);
const deliveryKey = urlParams.get('page');

const AmplienceContent = () => {
  const { loading, error, data } = useQuery(GET_DATA, {
    variables: {deliveryKey: deliveryKey}
  })

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const findType = (module: any) => {
    const contentType = module.__typename
    switch(contentType) {
        case 'Carousel':
            return <Carousel data={module.rawJson}/>
        case 'Banner':
            return <HeroMini moduleData={module.rawJson}/>
    }
  }

  const renderContent = () => {

    return data.page.slots.map((module: any) => {
        return (findType(module))
    })
  }

  return (
    <div>
        {renderContent()}
    </div>
  );
};

export default AmplienceContent;