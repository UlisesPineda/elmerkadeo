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
            <img src="/img/logo-purple-negative.webp" alt="Loading logo" />
        </div>
    </section>
  );
};
