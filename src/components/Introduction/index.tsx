import { Grid, GridItem } from '@chakra-ui/react';
import { ConentBox } from '../CommonItem';

export default function Introduction() {
  return (
    <>
      <ConentBox>
        <Grid
          templateColumns="repeat(6, 1fr)"
          gap={8}
          style={{ maxWidth: '1280px', minHeight: '1000px', margin: 'auto' }}
        >
          <GridItem colSpan={1}></GridItem>
          <GridItem colSpan={4}>
            {/*<Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />*/}
          </GridItem>
          <GridItem colSpan={1}></GridItem>
        </Grid>
      </ConentBox>
    </>
  );
}
