/* eslint-disable eqeqeq */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
// imports the React Javascript Library
import Avatar from '@material-ui/core/Avatar';
// Card
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
// Search
import Paper from '@material-ui/core/Paper';
// Tabs
import { withStyles } from '@material-ui/core/styles';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import CloseIcon from '@material-ui/icons/Close';
import CollectionsIcon from '@material-ui/icons/Collections';
import ReplayIcon from '@material-ui/icons/Replay';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';

const imageGallery = [
  'https://raw.githubusercontent.com/dxyang/StyleTransfer/master/style_imgs/mosaic.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
  'https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dora-maar-picasso.jpg',
  'https://pbs.twimg.com/profile_images/925531519858257920/IyYLHp-u_400x400.jpg',
  'https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dog.jpg',
  'http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg',
];

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800],
    },
  },
  cardHeader: {
    textalign: 'center',
    align: 'center',
    backgroundColor: 'white',
  },
  input: {
    display: 'none',
  },
  title: {
    color: blue[800],
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    align: 'center',
  },
  button: {
    color: blue[900],
    margin: 10,
  },
  secondaryButton: {
    color: 'gray',
    margin: 10,
  },
  typography: {
    margin: theme.spacing.unit * 2,
    backgroundColor: 'default',
  },

  searchRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },
  searchIconButton: {
    padding: 10,
  },
  searchDivider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainState: 'initial', // initial, search, gallery, uploaded
      imageUploaded: 0,
      selectedFile: null,
    };
    this.handleFileChange = props.handleFileChange;
  }

  handleUploadClick = (event) => {
    console.log();
    const file = event.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        selectedFile: [reader.result],
      });
    }.bind(this);
    console.log(url); // Would see a path?

    this.setState({
      mainState: 'uploaded',
      selectedFile: event.target.files[0],
      imageUploaded: 1,
    });

    this.handleFileChange(event.target.files[0]);
  };

  handleSearchClick = (event) => {
    this.setState({
      mainState: 'search',
    });
  };

  handleGalleryClick = (event) => {
    this.setState({
      mainState: 'gallery',
    });
  };

  handleSearchURL = (event) => {
    console.log();
    const file = event.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        selectedFile: [reader.result],
      });
    }.bind(this);
    console.log(url); // Would see a path?

    this.setState({
      selectedFile: event.target.files[0],
      imageUploaded: 1,
    });
  };

  handleSeachClose = (event) => {
    this.setState({
      mainState: 'initial',
    });
  };

  imageResetHandler = (event) => {
    console.log('Click!');
    this.setState({
      mainState: 'initial',
      selectedFile: null,
      imageUploaded: 0,
    });
  };

  handleAvatarClick(value) {
    const filename = value.url.substring(value.url.lastIndexOf('/') + 1);
    console.log(filename);
    this.setState({
      mainState: 'uploaded',
      imageUploaded: true,
      selectedFile: value.url,
      fileReader: undefined,
      filename,
    });
  }

  handleImageSearch(url) {
    const filename = url.substring(url.lastIndexOf('/') + 1);
    console.log(filename);
    this.setState({
      mainState: 'uploaded',
      imageUploaded: true,
      selectedFile: url,
      fileReader: undefined,
      filename,
    });
  }

  renderInitialState() {
    const { classes, theme } = this.props;
    const { value } = this.state;

    return (
      <>
        <CardContent>
          <Grid container justify='center' alignItems='center'>
            <input
              accept='image/*'
              className={classes.input}
              id='contained-button-file'
              multiple
              type='file'
              onChange={this.handleUploadClick}
            />
            <label htmlFor='contained-button-file'>
              <Fab component='span' className={classes.button}>
                <AddPhotoAlternateIcon />
              </Fab>
            </label>
            <Fab className={classes.button} onClick={this.handleSearchClick}>
              <SearchIcon />
            </Fab>
            <Fab className={classes.button} onClick={this.handleGalleryClick}>
              <CollectionsIcon />
            </Fab>
          </Grid>
        </CardContent>
      </>
    );
  }

  renderSearchState() {
    const { classes } = this.props;

    return (
      <Paper className={classes.searchRoot} elevation={1}>
        <InputBase className={classes.searchInput} placeholder='Image URL' />
        <IconButton className={classes.button} aria-label='Search' onClick={this.handleImageSearch}>
          <SearchIcon />
        </IconButton>
        <Divider className={classes.searchDivider} />
        <IconButton
          color='primary'
          className={classes.secondaryButton}
          aria-label='Close'
          onClick={this.handleSeachClose}
        >
          <CloseIcon />
        </IconButton>
      </Paper>
    );
  }

  renderGalleryState() {
    const { classes } = this.props;
    const listItems = this.props.imageGallery.map((url) => (
      <div
        onClick={(value) => this.handleAvatarClick({ url })}
        style={{
          padding: '5px 5px 5px 5px',
          cursor: 'pointer',
        }}
      >
        <Avatar src={url} />
      </div>
    ));

    return (
      <>
        <Grid>
          {listItems}
          <IconButton
            color='primary'
            className={classes.secondaryButton}
            aria-label='Close'
            onClick={this.handleSeachClose}
          >
            <ReplayIcon />
          </IconButton>
        </Grid>
      </>
    );
  }

  renderUploadedState() {
    const { classes, theme } = this.props;

    return (
      <>
        <CardActionArea onClick={this.imageResetHandler}>
          <Grid container justify='center' alignItems='center'>
            <img width='50%' src={this.state.selectedFile} alt='' />
          </Grid>
        </CardActionArea>
      </>
    );
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <>
        <div className={classes.root}>
          <Card className={this.props.cardName}>
            {(this.state.mainState == 'initial' && this.renderInitialState()) ||
              (this.state.mainState == 'search' && this.renderSearchState()) ||
              (this.state.mainState == 'gallery' && this.renderGalleryState()) ||
              (this.state.mainState == 'uploaded' && this.renderUploadedState())}
          </Card>
        </div>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ImageUploader);
