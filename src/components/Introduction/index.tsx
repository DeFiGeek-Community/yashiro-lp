import { Box, Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
import { ConentBox } from '../CommonItem';

export default function Introduction() {
  const matches = useMediaQuery('(min-width:1060px)');

  if (matches[0] == true) {
    return (
      <>
        <span>{`(min-width:1060px) matches: ${matches}`}</span>;
        <ConentBox>
          <Grid
            templateColumns="repeat(10, 1fr)"
            gap={8}
            style={{ maxWidth: '1280px', minHeight: '1000px', margin: 'auto' }}
          >
            <GridItem colSpan={5} style={{ background: 'blue' }}>
              PC用のイメージ画像
            </GridItem>
            <GridItem colSpan={5} style={{ background: 'green' }}>
              PC用の説明
              {/*<Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />*/}
            </GridItem>
          </Grid>
          <button
            style={{
              width: '100px',
              height: '25px',
              background: 'black',
              color: 'white',
            }}
          >
            ボタン
          </button>
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
          style={{ maxWidth: '1280px', minHeight: '1000px', margin: 'auto' }}
        >
          <GridItem colSpan={10} style={{ background: 'blue' }}>
            SP用のイメージ画像
          </GridItem>
        </Grid>
        <Grid
          templateColumns="repeat(10, 1fr)"
          gap={8}
          style={{ maxWidth: '1280px', minHeight: '1000px', margin: 'auto' }}
        >
          <GridItem colSpan={10} style={{ background: 'green' }}>
            SP用の説明
          </GridItem>
        </Grid>
      </ConentBox>
    </>
  );
}
