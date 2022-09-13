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
            <GridItem colSpan={8} style={{ background: 'blue' }}></GridItem>
            <Box colSpan={1} />
            <GridItem colSpan={1} style={{ background: 'green' }}>
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
          style={{ maxWidth: '1280px', minHeight: '1000px', margin: 'auto' }}
        >
          <GridItem colSpan={1} style={{ background: 'blue' }}></GridItem>
          <Box colSpan={1} />
          <GridItem colSpan={8} style={{ background: 'green' }}>
            {/*<Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />*/}
          </GridItem>
        </Grid>
      </ConentBox>
    </>
  );
}
