import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import useAxios from 'axios-hooks';
import BeerDetail from './BeerDetail';

type Beer = {
  id: number;
  name: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: 'block',
      marginTop: theme.spacing(2)
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    }
  })
);

const ChooseBeer: React.FunctionComponent = () => {
  const classes = useStyles();
  const [beerId, setBeer] = React.useState<string>('');
  const [isDisplayed, setDisplay] = React.useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDisplay(false);
    setBeer(event.target.value as string);
  };

  const [{ data, loading }] = useAxios<Beer[]>(
    'https://api.punkapi.com/v2/beers?page=1&per_page=10'
  );

  if (loading) return <p>loading...</p>;

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-controlled-open-select-label'>
          Beers list
        </InputLabel>
        <Select
          labelId='demo-controlled-open-select-label'
          id='demo-controlled-open-select'
          value={beerId}
          onChange={handleChange}
        >
          {data.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant='contained'
          color='primary'
          onClick={() => setDisplay(true)}
        >
          Get beer description !
        </Button>
        <BeerDetail value={beerId} display={isDisplayed} />
      </FormControl>
    </div>
  );
};

export default ChooseBeer;
