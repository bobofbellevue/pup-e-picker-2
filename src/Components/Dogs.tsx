import { Dog, TabValues } from "../types";
import { useDogsContext } from "../Providers/DogProvider";
import { useStatusContext } from "../Providers/StatusProvider";
import { DogCard } from "./DogCard";

export const Dogs = () => {
  const { activeTab, isLoading } = useStatusContext();
  const { dogs, flipDogFavoriteStatus, deleteDog } = useDogsContext();

  const shouldHideContainer =
    activeTab === TabValues.CREATE_DOG ? { display: "none" } : {};

  const shouldDisplayDog = (dog: Dog) => {
    switch (activeTab) {
      case TabValues.FAVORITE:
        return dog.isFavorite;
      case TabValues.UNFAVORITE:
        return !dog.isFavorite;
      case TabValues.NONE:
        return true;
    }
    return false;
  };

  const displayDogs = dogs.filter((dog) => shouldDisplayDog(dog));
  
  return (
    <div className="content-container" style={shouldHideContainer}>
      {displayDogs.map((dog) => (
        <DogCard
          dog={dog}
          key={dog.id}
          onTrashIconClick={() => deleteDog(dog)}
          onHeartClick={() => flipDogFavoriteStatus(dog)}
          onEmptyHeartClick={() => flipDogFavoriteStatus(dog)}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};
