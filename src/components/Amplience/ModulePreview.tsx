/* eslint-disable @typescript-eslint/no-explicit-any */
// Amplience.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Carousel from './carousel/Carousel';
import HeroMini from './heroMini/HeroMini';


const GET_MODULE = gql`
query($deliveryId: String) {
  contentNode(deliveryId: $deliveryId) {
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
`

const urlParams = new URLSearchParams(window.location.search);
const deliveryId = urlParams.get('content');

const AmpxModulePreview = () => {
  const { loading, error, data } = useQuery(GET_MODULE, {
    variables: {deliveryId: deliveryId}
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const findType = (module: any) => {
    const contentType = module.__typename
    switch(contentType) {
        case 'Carousel':
            return <Carousel contentId={deliveryId} data={module.rawJson}/>
        case 'Banner':
            return <HeroMini contentId={deliveryId} moduleData={module.rawJson}/>
    }
  }

  const renderContent = () => {
    return findType(data.contentNode)
  }

  return (
    <div>
        {renderContent()}
    </div>
  );
};

export default AmpxModulePreview;