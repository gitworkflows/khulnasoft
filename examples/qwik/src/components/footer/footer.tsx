import { component$ } from '@khulnasoft.com/qwik';
import styles from './footer.module.css';

export default component$(() => {
  return (
    <footer>
      <div class={styles.wrapper}>
        <a href="https://www.khulnasoft.com/" target="_blank" class={styles.anchor}>
          <span>Made with ♡ by Khulnasoft.com</span>
        </a>
      </div>
    </footer>
  );
});
