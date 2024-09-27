import {
    container,
    imgContainer,
} from './styles/LoadingPage.module.css';

export const LoadingPage = () => {
  return (
    <section
        className={ container }
    >
        <div
            className={ imgContainer }
        >
            <img src={`${ import.meta.env.BASE_URL }/img/logo-purple-negative.webp`} alt="Loading logo" />
        </div>
    </section>
  );
};
