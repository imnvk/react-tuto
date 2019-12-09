import React, { useEffect } from 'react';
import useAxios from 'axios-hooks';

type BeerDetailProps = {
  value: string;
  display: boolean | undefined;
};

type BeerDetail = {
  description: string;
};

const BeerDetail: React.FunctionComponent<BeerDetailProps> = props => {
  const { value } = props;
  const { display } = props;
  const [{ data, loading }, fetchBeer] = useAxios<BeerDetail[]>(
    {
      url: `https://api.punkapi.com/v2/beers/${value}`,
      method: 'GET'
    },
    { manual: true }
  );

  useEffect(() => {
    if (value) {
      fetchBeer();
    }
  }, [value]);

  if (loading) return <p>loading...</p>;

  if (!data || data.length === 0 || !display) {
    return null;
  }

  const { description } = data[0];

  return <div>{description}</div>;
};

export default BeerDetail;
