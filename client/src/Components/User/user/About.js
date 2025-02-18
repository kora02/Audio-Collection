import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

const MainContainer = styled.div`
  max-width: 1300px;
  margin: 38px auto; /* Center the container */
  padding: 50px;
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const ListContainer = styled.div`
  padding: 60px 40px; 
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  margin-bottom: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  font-weight: 200;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #2b2525;
`;

const ListItem = styled.li`
  text-align: left;
  margin-left: 30px; 
  padding: 2px 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  margin-bottom: 20px;
  font-size: 1rem;
  line-height: 1.6;
  color: #2b2525;
  font-weight: 300; /* Lighter font weight */
`;

const About = () => {
  return (
    <MainContainer>
      <Header>
        <Typography variant="h4" color="primary">Moji podaci</Typography>
        <Button variant="outlined" color="primary" component={Link} to="/user">Povratak na početnu</Button>
      </Header>
      <ListContainer>
        <Paragraph>
          Cilj ove inovativne aplikacije je pretvaranje teksualnih podataka u audio formate. Ključni dio procesa su korisnici: aplikacija koristi moć govora kako bi odabrane tekstove pretvorila u audio datoteke. To znači da korisnici aktivno sudjeluju u eksperimentima čitajući tekstove naglas.
        </Paragraph>
        <Paragraph>
          Klikom na "Start recording", korisnik pokreće snimanje i ima za zadatak da pročita odabrani tekst. Nakon završetka čitanja, korisnik klikne na dugme "Stop recording" da bi se snimanje zaustavilo.
        </Paragraph>
        <Paragraph>
          Ova platforma nudi:
          <ul>
            <ListItem>Širok izbor tekstova: Korisnici mogu birati niz različitih tekstova za čitanje.</ListItem>
            <ListItem>Jednostavnost korištenja: Aplikacija je dizajnirana da bude laka za korištenje i ne zahtijeva tehničko znanje.</ListItem>
            <ListItem>Opciju pretraživanja: Korisnici mogu pretraživati tipove eksperimenata koji ih zanimaju.</ListItem>
          </ul>
        </Paragraph>
        <Paragraph>
          Snimljeni audio zapis se pohranjuje i koristit će se za daljnje analize, istraživanja i slične svrhe.
        </Paragraph>
      </ListContainer>
    </MainContainer>
  );
}

export default About;
