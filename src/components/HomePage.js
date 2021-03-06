import React from 'react';
import styled from 'styled-components';

import { ReactComponent as UnstyledCompose } from 'assets/icons/compose.svg';
import { ReactComponent as UnstyledCheckmark } from 'assets/icons/checkmark.svg';
import { ReactComponent as UnstyledEnvelope } from 'assets/icons/envelope.svg';
import HomePageImage from 'assets/images/home.png';
import Button from './Button';

const Main = styled.main`
  display: grid;
  grid-row-gap: 20px;
  grid-template-areas:
    'article'
    'image  ';

  @media (min-width: 560px) {
    grid-template-areas:
      '. article'
      '. image  ';
    grid-template-columns: 1fr 520px;
  }

  @media (min-width: 1060px) {
    grid-template-areas: 'article image';
    grid-column-gap: 20px;
    grid-template-columns: 500px 1fr;
  }

  @media (min-width: 1160px) {
    grid-template-areas: '. article . image .';
    grid-column-gap: 0;
    grid-template-columns: 1fr 500px 20px 600px 1fr;
  }
`;

const Article = styled.article`
  grid-area: article;
`;

const H2 = styled.h2`
  margin-top: 20px;
`;

const Section = styled.section`
  margin-top: 60px;
`;

const H3 = styled.h3`
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const OrderButton = styled(Button)`
  margin-top: 40px;
  width: max-content;
`;

const OrderedList = styled.ol`
  padding: 0;
`;

const ListItem = styled.li`
  margin: 20px 0;
  list-style-type: none;
  font-size: 18px;
  font-weight: 400;
  display: flex;
  align-items: center;
`;

const Compose = styled(UnstyledCompose)`
  fill: ${props => props.theme.colours.grey['300']};
  width: 15px;
  margin-right: 20px;
`;

const Checkmark = styled(UnstyledCheckmark)`
  fill: ${props => props.theme.colours.grey['300']};
  width: 15px;
  margin-right: 20px;
`;

const Envelope = styled(UnstyledEnvelope)`
  fill: ${props => props.theme.colours.grey['300']};
  width: 15px;
  margin-right: 20px;
`;

const Image = styled.img`
  width: 100%;
  grid-area: image;
`;

const ListItemLabel = styled.p`
  padding: 0;
  margin: 0;
`;

function HomePage() {
  return (
    <Main>
      <Article>
        <H2>Beautiful, one-of-a-kind cards for $10</H2>
        <Section>
          <H3>How it works</H3>
          <OrderedList>
            <ListItem>
              <Compose />
              <ListItemLabel>Submit an order</ListItemLabel>
            </ListItem>
            <ListItem>
              <Checkmark />
              <ListItemLabel>Approve my draft</ListItemLabel>
            </ListItem>
            <ListItem>
              <Envelope />
              <ListItemLabel>Wait for your order in the mail</ListItemLabel>
            </ListItem>
          </OrderedList>
        </Section>
        <OrderButton navigateTo="/order">Order a card</OrderButton>
      </Article>
      <Image
        src={HomePageImage}
        alt="Ciao, Estrela card with dog and flowers"
      />
    </Main>
  );
}

export default HomePage;
