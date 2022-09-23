import { Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
//import { padding } from 'polished';
import BackgroundImage from '../../assets/images/background_main.webp';
import marimo from '../../assets/test/marimo.png';
import Logo from '../../assets/test/marimo_logo.png';
import water_tank from '../../assets/test/water_tank.png';

import { ConentBox } from '../CommonItem';

export default function First() {
  const matches = useMediaQuery('(min-width:1060px)');

  if (matches[0] == true) {
    return (
      <>
        <ConentBox>
          <Grid
            templateColumns="repeat(10, 1fr)"
            gap={8}
            style={{ maxWidth: '1280px', minHeight: '600px', margin: 'auto' }}
          >
            <GridItem
              colSpan={5}
              style={{
                backgroundImage: `url(${BackgroundImage})`,
              }}
            >
              <img
                src={water_tank}
                style={{
                  backgroundImage: `url(${BackgroundImage})`,
                  margin: '0 auto',
                  opacity: '1',
                  zIndex: 0,
                  position: 'relative',
                }}
              ></img>
              <img
                src={marimo}
                style={{
                  height: '20vh',
                  margin: '0 auto',
                  position: 'relative',
                  bottom: '45vh',
                  zIndex: 2,
                }}
              ></img>
            </GridItem>

            <GridItem colSpan={5} style={{ background: 'green' }}>
              PC用の説明
              {/*<Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />*/}
            </GridItem>
          </Grid>
        </ConentBox>
      </>
    );
  }
  return (
    <>
      <span>{`(min-width:600px) matches: ${matches}`}</span>;
      <ConentBox>
        <Grid
          templateColumns="repeat(10, 1fr)"
          gap={8}
          style={{ maxWidth: '1280px', maxHeight: '600px', margin: 'auto' }}
        >
          <GridItem
            colSpan={10}
            style={{
              backgroundImage: `url(${BackgroundImage})`,
            }}
          >
            <img
              src={water_tank}
              style={{
                backgroundImage: `url(${BackgroundImage})`,
                margin: '0 auto',
                opacity: '1',
                zIndex: 0,
                position: 'relative',
              }}
            ></img>
            <img
              src={marimo}
              style={{
                height: '20vh',
                margin: '0 auto',
                position: 'relative',
                bottom: '350px',
                zIndex: 2,
              }}
            ></img>
          </GridItem>
        </Grid>
        <Grid
          templateColumns="repeat(10, 1fr)"
          gap={8}
          style={{ maxWidth: '1280px', minHeight: '600px', margin: 'auto' }}
        >
          <GridItem colSpan={10} style={{ background: 'green' }}>
            <img
              src={Logo}
              width={422}
              height={50}
              style={{ margin: 'auto', padding: '20px 0 20px 0' }}
            ></img>
            <p
              style={{
                fontSize: '5.0rem',
                lineHeight: '7rem',
                textAlign: 'left',
                width: '422px',
                margin: 'auto',
              }}
            >
              marimoとは？
            </p>
            <p
              style={{
                fontSize: '2.0rem',
                lineHeight: '2.5rem',
                textAlign: 'left',
                width: '422px',
                margin: '0 auto 20px auto',
              }}
            >
              <div>
                marimo
                は、NFTを購入することで、marimoを育てられるプロジェクトです。お世話はたまに水を替えるだけ。marimoはだんだんと大きくなっていきます。
              </div>
              <div>ただいま二次販売サイトにて購入が可能です。</div>
            </p>
            <p
              style={{
                fontSize: '5.0rem',
                lineHeight: '7rem',
                textAlign: 'left',
                width: '422px',
                margin: 'auto',
              }}
            >
              <div>価格:0.01ETH</div>
            </p>
            <p
              style={{
                fontSize: '5.0rem',
                lineHeight: '7rem',
                textAlign: 'left',
                width: '422px',
                margin: 'auto',
              }}
            >
              <div>数量: 100/1000</div>
            </p>
            <div
              style={{
                margin: 'auto',
                width: '100px',
                height: '25px',
                background: 'black',
              }}
            >
              <button
                style={{
                  color: 'white',
                  textAlign: 'center',
                  width: '100px',
                  height: '25px',
                }}
              >
                購入するボタン
              </button>
            </div>
          </GridItem>
        </Grid>
      </ConentBox>
    </>
  );
}
