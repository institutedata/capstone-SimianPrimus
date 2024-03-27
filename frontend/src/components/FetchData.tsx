import React, { useState, useEffect } from 'react';

type Item = {
  id: number;
  title: string;
  // Add any additional properties here
};

type FetchDataProps = {
  url: string;
};

const FetchData: React.FC<FetchDataProps> = ({ url }) => {
  const [data, setData] = useState<Item[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData: Item[] = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data && data.map((item: Item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
};

export default FetchData;