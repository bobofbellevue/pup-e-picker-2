import { ReactNode } from "react";
import { TabValues } from "../types";
import { SectionButton } from "./SectionButton";
import { useDogsContext } from "../Providers/DogProvider";

export type SectionProps = {
  label: string;
  children: ReactNode;
}

export const Section = (props: SectionProps) => {
  const { favoriteCount, unFavoriteCount } = useDogsContext();

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{props.label}</div>
        <SectionButton
          tab={TabValues.FAVORITE}
          count={favoriteCount}
          name="favorited"
        />
        <SectionButton
          tab={TabValues.UNFAVORITE}
          count={unFavoriteCount}
          name="unfavorited"
        />
        <SectionButton
          tab={TabValues.CREATE_DOG}
          count={-1}
          name="create dog"
        />
      </div>
      <div className="content-container">{props.children}</div>
    </section>
  );
};
