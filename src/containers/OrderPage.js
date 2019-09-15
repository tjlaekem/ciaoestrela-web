import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import Button from '../components/Button';
import { actions as cartActions } from '../store/cart';
import colours from '../styles/colours';
import fonts from '../styles/fonts';
import OrderPageImage from '../assets/images/order.png';
import panelStyle from '../styles/panelStyle';
import UnstyledSelect from '../components/Select';

const Main = styled.main`
  display: grid;
  grid-row-gap: 20px;
  grid-template-areas:
    "form"
    "image";

  @media (min-width: 540px) {
    grid-template-areas:
      ". form "
      ". image";
    grid-template-columns: 1fr 500px;
  }

  @media (min-width: 1060px) {
    grid-template-areas:
      "image form"
      "image .   ";
    grid-template-columns: 1fr 500px;
    grid-column-gap: 20px;
  }

  @media (min-width: 1160px) {
    grid-template-areas:
      ". image . form ."
      ". image . .    .";
    grid-template-columns: 1fr 600px 20px 500px 1fr;
    grid-column-gap: 0;
  }
`;

const Form = styled.form`
  ${panelStyle}

  display: grid;
  grid-template-areas:
    'cardstock   cardstock  '
    'select      select     '
    'ideas-label ideas-label'
    'ideas       ideas      '
    'submit      .          ';
  grid-template-columns: auto 1fr;
  grid-row-gap: 10px;
`;

const CardstockLabel = styled.label`
  grid-area: cardstock;
`;

const Select = styled(UnstyledSelect)`
  grid-area: select;
`;

const IdeasLabel = styled.label`
  grid-area: ideas-label;
`;

const IdeasTextarea = styled.textarea`
  grid-area: ideas;
  height: 100px;
  border: solid ${colours.grey[300]} 1px;
  font-family: ${fonts.body}, ${fonts.fallback};
  color: ${colours.grey[400]};
  font-weight: 300;
`;

const Image = styled.img`
  width: 100%;
  grid-area: image;
`;

const OrderPage = () => {
  const [cardstock, setCardstock] = useState('4" x 5.5" white');
  const [ideas, setIdeas] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dispatch = useDispatch();

  const submitForm = () => {
    setHasSubmitted(true);
    dispatch(cartActions.addCustomCardToCart({ cardstock, ideas }));
  };

  if (hasSubmitted) {
    return <Redirect to="/cart" />;
  }

  return (
    <Main>
      <Form action="#">
        <CardstockLabel>Which cardstock would you like me to use to make your card?</CardstockLabel>

        <Select
          onSelect={setCardstock}
          options={['4" x 5.5" white', '4" x 5.5" ivory', '4" x 5.5" brown', '5" x 6.5" white']}
          selected={cardstock}
        />

        <IdeasLabel>Please share any ideas you have for the design of your card!</IdeasLabel>
        <IdeasTextarea value={ideas} onChange={(event) => { setIdeas(event.target.value); }} />

        <Button onClick={submitForm} isFormSubmit>Add to cart</Button>
      </Form>
      <Image src={OrderPageImage} alt="Ciao, Estrela lion with leaves" />
    </Main>
  );
};

export default OrderPage;