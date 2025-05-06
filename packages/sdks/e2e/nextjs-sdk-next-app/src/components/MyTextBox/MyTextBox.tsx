'use client';

export interface TextProps {
  text: string;
}

function MyTextBox(props: TextProps) {
  return (
    <div>
      My Custom Text Box
      <span
        className="khulnasoft-text"
        dangerouslySetInnerHTML={{ __html: props.text }}
        style={{
          outline: 'none',
        }}
      />
    </div>
  );
}

export default MyTextBox;
