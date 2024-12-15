/* eslint-disable @typescript-eslint/no-explicit-any */
// Carousel.js
import React from 'react';
import './HeroMini.scss'
import { useQuery, gql } from '@apollo/client';

const GET_DATA = gql`
query($deliveryId: String) {
  contentNode(deliveryId: $deliveryId) {
    ... on Banner {
      rawJson {
        content
      }
    }
  }
}`

const deliveryId: string = '556742fc-faa6-4a0f-a10b-19554358f3c4'

const HeroMini = (moduleData: any) => {
  const { loading, error, data } = useQuery(GET_DATA, {
    variables: {deliveryId}
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const module = () => {
    if (!moduleData) {
      return data
    } else {
      return moduleData
    }
  }

  const getContent = () => {
    return module().moduleData ? module().moduleData.content : data.contentNode.content
  }

  const content = getContent()

  console.log("hero image data", content)
  const mediaImage = content.image.image.name

  const renderLinks = () => {
    
    return content.links.map((link: any) => {
      return <a className={'a-button'} href={`${link.link.linkUrl}`}>
        <div className={'button'}>
        {link.link.buttonText.values[0].value}
        </div>
      </a>
    })
  }


  return (
    <div className="hero-mini-container">
      <div className="media-asset">
        <img src={`https://underarmour.scene7.com/is/image/Underarmour/${mediaImage}?qlt=75&fmt=jpg&wid=1440&op_sharpen=1&`}></img>
      </div>
      <div className='teaser'>
        <div className="hero-mini-snipe h6">
          {content.bannerText.description}
        </div>
        <div className="hero-mini-headline h1">
          {content.bannerText.header}
        </div>
        <div className="hero-mini-subheadline body-text">
          {content.bannerText.subheader}
        </div>
        <div className="cta-wrapper">
          {renderLinks()}
        </div>
      </div>
    </div>
  );
};

export default HeroMini;