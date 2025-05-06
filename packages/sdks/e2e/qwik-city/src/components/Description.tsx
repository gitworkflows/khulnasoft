import { component$ } from '@khulnasoft.com/qwik';

export const Description = component$((props: { text: string }) => {
  return (
    <div>
      <h3>{props.text}</h3>
    </div>
  );
});
