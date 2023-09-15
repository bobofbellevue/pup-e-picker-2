import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { Dog } from "../types.ts";
import { Requests } from "../api.tsx";
import { useStatusContext } from "../Providers/StatusProvider";

export type TDogProvider = {
  dogs: Dog[];
  setDogs(this: void, dogs: Dog[]): void;
  flipDogFavoriteStatus(targetDog: Dog): void;
  deleteDog(targetDog: Dog): void;
  favoriteCount: number;
  unFavoriteCount: number;
};

const DogsContext = createContext<TDogProvider>({} as TDogProvider);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, dogsSetter] = useState<Dog[]>([]);
  const { setIsLoading } = useStatusContext();
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [unFavoriteCount, setUnFavoriteCount] = useState(0);

  const setDogs = (dogs: Dog[]) => {
    dogsSetter(dogs);
    const favorites = dogs.reduce((total, dog) => total + ((dog.isFavorite) ? 1 : 0), 0);
    setFavoriteCount(favorites);
    setUnFavoriteCount(dogs.length - favorites);
  }

  const refetchData = async () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((dogs: Dog[]) => {
        setDogs(dogs);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    refetchData();
  }, []);

  const flipDogFavoriteStatus = (targetDog: Dog) => {
    const newDog: Dog = {...targetDog};
    newDog.isFavorite = !targetDog.isFavorite;
    const newDogs = dogs.map((dog) => (dog.id === newDog.id) ? newDog : dog);
    setDogs(newDogs);
    Requests.updateDog(newDog)
      .catch((err) => {
        setDogs(dogs);
        console.error(err);
      });
  };

  const deleteDog = (targetDog: Dog) => {
    const otherDogs = dogs.filter(
      (findDog) => findDog.id !== targetDog.id
    );
    setDogs(otherDogs);
    Requests.deleteDog(targetDog)
      .catch((err) => {
        setDogs(dogs);
        console.error(err);
      });
  };

  return (
    <DogsContext.Provider
      value={{
        dogs,
        setDogs,
        flipDogFavoriteStatus,
        deleteDog,
        favoriteCount,
        unFavoriteCount,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

export const useDogsContext = () => useContext(DogsContext);
