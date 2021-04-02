import {
  Container,
  GridList,
  GridListTile,
  makeStyles,
} from '@material-ui/core';
import React from 'react';

const tileData = [
  {
    img: 'https://picsum.photos/500/300?random=1',
    title: 'Breakfast',
    author: 'jill111',
    cols: 2,
    featured: true,
  },
  {
    img: 'https://picsum.photos/500/300?random=2',
    title: 'Tasty burger',
    author: 'director90',
  },
  {
    img: 'https://picsum.photos/500/300?random=3',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: 'https://picsum.photos/500/300?random=4',

    title: 'Morning',
    author: 'fancycrave1',
    featured: true,
  },
  {
    img: 'https://picsum.photos/500/300?random=5',

    title: 'Hats',
    author: 'Hans',
  },
  {
    img: 'https://picsum.photos/500/300?random=6',
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    img: 'https://picsum.photos/500/300?random=7',
    title: 'Vegetables',
    author: 'jill111',
    cols: 2,
  },
  {
    img: 'https://picsum.photos/500/300?random=8',
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
  {
    img: 'https://picsum.photos/500/300?random=9',
    title: 'Mushrooms',
    author: 'PublicDomainPictures',
  },
  {
    img: 'https://picsum.photos/500/300?random=10',
    title: 'Olive oil',
    author: 'congerdesign',
  },
  {
    img: 'https://picsum.photos/500/300?random=11',
    title: 'Sea star',
    cols: 2,
    author: '821292',
  },
  {
    img: 'https://picsum.photos/500/300?random=12',
    title: 'Bike',
    author: 'danfador',
  },
];

const useStyles = makeStyles((theme) => ({
  imageGridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  gridList: {
    maxHeight: 350,
  },
}));

const ImageList = () => {
  const classes = useStyles();

  return (
    <Container className={classes.imageGridContainer}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </Container>
  );
};

export default ImageList;
