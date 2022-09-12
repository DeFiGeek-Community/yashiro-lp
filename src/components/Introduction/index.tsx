import { Grid, GridItem, Image } from '@chakra-ui/react';
import { ConentBox } from '../CommonItem';

export default function Introduction() {
  return (
    <>
      <ConentBox>
        <Grid
          templateColumns="repeat(6, 1fr)"
          gap={8}
          style={{ maxWidth: '1280px', margin: 'auto' }}
        >
          <GridItem colSpan={1}></GridItem>
          <GridItem colSpan={4}>
            <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
            <Image
              src="https://ipfs.io/ipfs/QmaS9H7kua2q9gbjCaazoMm4SxiZSWF5PawE6JTwJ91UaG/nft.png"
              alt="image"
            />
          </GridItem>
          <GridItem colSpan={1}></GridItem>
        </Grid>
      </ConentBox>
    </>
  );
}
