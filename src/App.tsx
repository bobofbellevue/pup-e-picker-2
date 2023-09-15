import { Section } from "./Components/Section";
import { DogsProvider } from "./Providers/DogProvider";
import { StatusProvider } from "./Providers/StatusProvider";
import { Dogs } from "./Components/Dogs";
import { CreateDogForm } from "./Components/CreateDogForm";

export function App() {
  return (
    <StatusProvider>
      <DogsProvider>
        <div className="App" style={{ backgroundColor: "skyblue" }}>
          <header>
            <h1>pup-e-picker (Functional)</h1>
          </header>
          <Section label={"Dogs: "}>
            <Dogs />
            <CreateDogForm />
          </Section>
        </div>
      </DogsProvider>
    </StatusProvider>
  );
}
