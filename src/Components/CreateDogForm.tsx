import { useState, FormEvent, ChangeEvent } from "react";
import { dogPictures } from "../dog-pictures";
import { useStatusContext } from "../Providers/StatusProvider";
import { Requests } from "../api";
import { TabValues, Dog } from "../types";
import { useDogsContext } from "../Providers/DogProvider";
import { toast } from "react-hot-toast";

function makeEmptyDog(): Dog {
  return {
    id: 0,
    name: "",
    // grabs image name off of first entry of dogPictures as default image
    image: Object.entries(dogPictures)
      .slice(0, 1)
      .map(([, pictureValue]) => pictureValue)[0],
    description: "",
    isFavorite: false,
  };
}

export const CreateDogForm = () =>
  // no props allowed
  {
    const [dog, setDog] = useState<Dog>(makeEmptyDog());
    const { activeTab, isLoading } = useStatusContext();
    const { dogs, setDogs } = useDogsContext();

    const onSubmitDog = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newDog: Dog = dog;
      Requests.postDog(dog)
        .then((data: Dog) => {
          newDog.id = data.id; // get the new dog ID back from POST
          dogs.push(newDog);
          setDogs(dogs);
          toast.success("Dog Created");
        })
        .finally(() => {
          setDog(makeEmptyDog());
        })
        .catch(
          (err) => {
            console.error(err);
            setDogs(dogs);
          }
        );
    };

    const shouldHideForm =
      activeTab != TabValues.CREATE_DOG ? { display: "none" } : {};

    const onChange = (
      e: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
      property: string
    ) => {
      setDog({ ...dog, [property]: e.target.value });
    };

    return (
      <form
        action=""
        id="create-dog-form"
        style={shouldHideForm}
        onSubmit={(e) => onSubmitDog(e)}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          onChange={(e) => onChange(e, "name")}
          value={dog.name}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          disabled={isLoading}
          onChange={(e) => onChange(e, "description")}
          value={dog.description}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id=""
          onChange={(e) => onChange(e, "image")}
          value={dog.image}
          disabled={isLoading}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={!dog.name || isLoading} />
      </form>
    );
  };
